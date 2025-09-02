// Resource Calculator and Optimization Utilities
// Provides material sourcing recommendations based on available locations

import { mines } from '../data/locations.js';

export class ResourceCalculator {
  constructor(userLocations = []) {
    this.userLocations = userLocations;
  }

  // Update user's location data
  updateLocations(locations) {
    this.userLocations = locations;
  }

  // Get available preppers/facilities with materials
  getAvailablePreppers() {
    return this.userLocations.filter(location => 
      location.type !== 'mine' && 
      location.unlocked && 
      location.active &&
      this.getTotalAvailableMaterials(location) > 0
    );
  }

  // Get available mines
  getAvailableMines() {
    return this.userLocations.filter(location => 
      location.type === 'mine' && 
      location.unlocked && 
      location.active
    );
  }

  // Calculate total available materials from a location
  getTotalAvailableMaterials(location) {
    if (location.type === 'mine') return Infinity; // Mines have unlimited production
    
    return Object.values(location.availableMaterials || {})
      .reduce((sum, amount) => sum + amount, 0);
  }

  // Get best mine for a specific material type
  getBestMineForMaterial(materialType) {
    const availableMines = this.getAvailableMines();
    const minesForMaterial = availableMines.filter(mine => {
      const mineData = mines.find(m => m.id === mine.id);
      return mineData && mineData.materialType === materialType;
    });

    if (minesForMaterial.length === 0) return null;

    // Sort by conversion rate (higher is better)
    return minesForMaterial.sort((a, b) => {
      const mineDataA = mines.find(m => m.id === a.id);
      const mineDataB = mines.find(m => m.id === b.id);
      
      const rateA = mineDataA.conversionRate * (a.upgraded ? mineDataA.upgradeMultiplier : 1);
      const rateB = mineDataB.conversionRate * (b.upgraded ? mineDataB.upgradeMultiplier : 1);
      
      return rateB - rateA;
    })[0];
  }

  // Calculate chiral crystals needed for mine production
  calculateChiralCrystalsNeeded(materialType, amount) {
    const bestMine = this.getBestMineForMaterial(materialType);
    if (!bestMine) return null;

    const mineData = mines.find(m => m.id === bestMine.id);
    const effectiveRate = mineData.conversionRate * (bestMine.upgraded ? mineData.upgradeMultiplier : 1);
    
    return Math.ceil(amount / effectiveRate);
  }

  // Generate sourcing recommendations for required materials
  generateSourcingRecommendations(requiredMaterials) {
    const recommendations = {
      fromPreppers: {},
      fromMines: {},
      totalChiralCrystalsNeeded: 0,
      unmetRequirements: {},
      sourcingPlan: []
    };

    const availablePreppers = this.getAvailablePreppers();
    
    // Process each required material
    Object.entries(requiredMaterials).forEach(([materialType, requiredAmount]) => {
      if (requiredAmount <= 0) return;

      let remainingNeeded = requiredAmount;
      let fromPreppers = 0;
      let fromMines = 0;

      // First, try to source from preppers/facilities
      availablePreppers.forEach(location => {
        if (remainingNeeded <= 0) return;
        
        const available = location.availableMaterials?.[materialType] || 0;
        const canTake = Math.min(available, remainingNeeded);
        
        if (canTake > 0) {
          fromPreppers += canTake;
          remainingNeeded -= canTake;
          
          if (!recommendations.fromPreppers[location.id]) {
            recommendations.fromPreppers[location.id] = {
              name: location.name,
              materials: {}
            };
          }
          recommendations.fromPreppers[location.id].materials[materialType] = canTake;
        }
      });

      // If still need materials, source from mines
      if (remainingNeeded > 0) {
        const bestMine = this.getBestMineForMaterial(materialType);
        
        if (bestMine) {
          const chiralCrystalsNeeded = this.calculateChiralCrystalsNeeded(materialType, remainingNeeded);
          
          fromMines = remainingNeeded;
          recommendations.totalChiralCrystalsNeeded += chiralCrystalsNeeded;
          
          recommendations.fromMines[materialType] = {
            amount: remainingNeeded,
            mineName: bestMine.name,
            mineId: bestMine.id,
            chiralCrystalsNeeded
          };
          
          remainingNeeded = 0;
        } else {
          recommendations.unmetRequirements[materialType] = remainingNeeded;
        }
      }

      // Add to sourcing plan
      if (fromPreppers > 0 || fromMines > 0) {
        recommendations.sourcingPlan.push({
          material: materialType,
          totalNeeded: requiredAmount,
          fromPreppers,
          fromMines,
          unmet: remainingNeeded
        });
      }
    });

    return recommendations;
  }

  // Calculate collection route optimization
  generateCollectionRoute(sourcingRecommendations) {
    const route = [];
    
    // Add prepper/facility stops
    Object.entries(sourcingRecommendations.fromPreppers).forEach(([locationId, data]) => {
      const location = this.userLocations.find(l => l.id === locationId);
      if (location) {
        route.push({
          type: 'prepper',
          location: location.name,
          region: location.region,
          materials: data.materials,
          priority: this.calculateLocationPriority(location, data.materials)
        });
      }
    });

    // Add mine stops
    Object.entries(sourcingRecommendations.fromMines).forEach(([materialType, data]) => {
      const location = this.userLocations.find(l => l.id === data.mineId);
      if (location) {
        route.push({
          type: 'mine',
          location: data.mineName,
          region: location.region,
          materialType,
          amount: data.amount,
          chiralCrystalsNeeded: data.chiralCrystalsNeeded,
          priority: 10 // Mines generally have high priority due to unlimited production
        });
      }
    });

    // Sort by priority and region for efficient collection
    return route.sort((a, b) => {
      if (a.region !== b.region) {
        return a.region === 'mexico' ? -1 : 1; // Mexico first, then Australia
      }
      return b.priority - a.priority; // Higher priority first
    });
  }

  // Calculate location priority based on materials needed and availability
  calculateLocationPriority(location, materialsNeeded) {
    const totalNeeded = Object.values(materialsNeeded).reduce((sum, amount) => sum + amount, 0);
    const connectionBonus = location.connectionLevel ? location.connectionLevel * 0.5 : 0;
    return totalNeeded + connectionBonus;
  }

  // Get efficiency metrics for the sourcing plan
  getEfficiencyMetrics(sourcingRecommendations) {
    const totalMaterials = Object.values(sourcingRecommendations.fromPreppers)
      .reduce((sum, location) => {
        return sum + Object.values(location.materials).reduce((s, amount) => s + amount, 0);
      }, 0);

    const totalFromMines = Object.values(sourcingRecommendations.fromMines)
      .reduce((sum, mine) => sum + mine.amount, 0);

    const totalUnmet = Object.values(sourcingRecommendations.unmetRequirements)
      .reduce((sum, amount) => sum + amount, 0);

    const totalRequired = totalMaterials + totalFromMines + totalUnmet;
    const fulfillmentRate = totalRequired > 0 ? ((totalMaterials + totalFromMines) / totalRequired) * 100 : 100;

    return {
      totalRequired,
      fromPreppers: totalMaterials,
      fromMines: totalFromMines,
      unmet: totalUnmet,
      fulfillmentRate: Math.round(fulfillmentRate * 100) / 100,
      chiralCrystalsNeeded: sourcingRecommendations.totalChiralCrystalsNeeded,
      locationsToVisit: Object.keys(sourcingRecommendations.fromPreppers).length + 
                       Object.keys(sourcingRecommendations.fromMines).length
    };
  }
}

// Utility functions
export const formatMaterialName = (materialKey) => {
  const names = {
    metals: 'Metals',
    ceramics: 'Ceramics',
    resins: 'Resins',
    chemicals: 'Chemicals',
    specialAlloys: 'Special Alloys',
    chiralCrystals: 'Chiral Crystals'
  };
  return names[materialKey] || materialKey;
};

export const getMaterialIcon = (materialType) => {
  const icons = {
    metals: '⚙️',
    ceramics: '🏺',
    resins: '🧪',
    chemicals: '⚗️',
    specialAlloys: '✨',
    chiralCrystals: '💎'
  };
  return icons[materialType] || '📦';
};

export default ResourceCalculator;

