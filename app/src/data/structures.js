// Death Stranding 2 - Structures Data
// Based on research from GameSpot and IGN wikis

export const structures = [
  // PCC Level 1 Structures
  {
    id: 'bridge-foundation',
    name: 'Bridge Foundation',
    pccLevel: 1,
    category: 'Transportation',
    description: 'Cross rivers and obstacles. Adjustable length, requires metal donation to complete.',
    averageRequirements: {
      metals: 800,
      ceramics: 0,
      resins: 0,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 0
    },
    variableRequirements: true,
    notes: 'Material requirements vary based on bridge length and terrain'
  },
  {
    id: 'postbox',
    name: 'Postbox',
    pccLevel: 1,
    category: 'Utility',
    description: 'Storage, recycling, fabrication, and hiding from enemies.',
    averageRequirements: {
      metals: 200,
      ceramics: 150,
      resins: 100,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 50
    },
    variableRequirements: false
  },
  {
    id: 'watchtower',
    name: 'Watchtower',
    pccLevel: 1,
    category: 'Reconnaissance',
    description: 'Spy on enemy bases and reveal area information.',
    averageRequirements: {
      metals: 300,
      ceramics: 200,
      resins: 150,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 100
    },
    variableRequirements: false
  },
  {
    id: 'timefall-shelter',
    name: 'Timefall Shelter',
    pccLevel: 1,
    category: 'Utility',
    description: 'Protection from Timefall weather and temporary BT barrier.',
    averageRequirements: {
      metals: 250,
      ceramics: 300,
      resins: 200,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 150
    },
    variableRequirements: false
  },
  {
    id: 'generator',
    name: 'Generator',
    pccLevel: 1,
    category: 'Utility',
    description: 'Quickly recharge vehicle batteries. Critical for maintaining vehicle power.',
    averageRequirements: {
      metals: 400,
      ceramics: 200,
      resins: 100,
      chemicals: 50,
      specialAlloys: 100,
      chiralCrystals: 200
    },
    variableRequirements: false
  },

  // PCC Level 2 Structures
  {
    id: 'zip-line',
    name: 'Zip-line',
    pccLevel: 2,
    category: 'Transportation',
    description: 'Fast traversal across terrain. Default 300m length, upgradeable.',
    averageRequirements: {
      metals: 400,
      ceramics: 200,
      resins: 300,
      chemicals: 100,
      specialAlloys: 200,
      chiralCrystals: 250
    },
    variableRequirements: true,
    notes: 'Length can be upgraded, affecting material requirements'
  },
  {
    id: 'jump-ramp',
    name: 'Jump Ramp',
    pccLevel: 2,
    category: 'Transportation',
    description: 'Vehicle and foot traversal with jump mechanics. Negates fall damage.',
    averageRequirements: {
      metals: 500,
      ceramics: 300,
      resins: 200,
      chemicals: 0,
      specialAlloys: 150,
      chiralCrystals: 200
    },
    variableRequirements: false
  },
  {
    id: 'safehouse',
    name: 'Safehouse',
    pccLevel: 2,
    category: 'Facility',
    description: 'Full facility functionality with private room and vehicle services.',
    averageRequirements: {
      metals: 600,
      ceramics: 400,
      resins: 800,
      chemicals: 200,
      specialAlloys: 600,
      chiralCrystals: 1000
    },
    variableRequirements: false,
    notes: 'Requires significant investment but provides full facility services'
  },
  {
    id: 'transponder',
    name: 'Transponder',
    pccLevel: 2,
    category: 'Transportation',
    description: 'Fast travel system (Beach Jump) to other transponders and facilities.',
    averageRequirements: {
      metals: 300,
      ceramics: 200,
      resins: 400,
      chemicals: 300,
      specialAlloys: 500,
      chiralCrystals: 800
    },
    variableRequirements: false,
    notes: 'Only equipped gear travels with player, cargo left behind'
  },

  // Road Infrastructure
  {
    id: 'road-segment',
    name: 'Road Segment',
    pccLevel: 'Auto Paver',
    category: 'Infrastructure',
    description: 'Road construction via Auto Paver. Requires collaborative building.',
    averageRequirements: {
      metals: 1200,
      ceramics: 800,
      resins: 0,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 400
    },
    variableRequirements: true,
    notes: 'Material requirements vary by road segment. Other players can contribute.'
  },

  // Monorail Infrastructure
  {
    id: 'monorail-track',
    name: 'Monorail Track',
    pccLevel: 'Tracklayer',
    category: 'Infrastructure',
    description: 'Monorail construction via Tracklayer. Enables fast cargo/vehicle transport.',
    averageRequirements: {
      metals: 0,
      ceramics: 0,
      resins: 240,
      chemicals: 0,
      specialAlloys: 360,
      chiralCrystals: 720
    },
    variableRequirements: true,
    notes: 'Requirements vary by track section. Collaborative building supported.'
  }
];

export const structureCategories = [
  'All',
  'Transportation',
  'Utility',
  'Reconnaissance',
  'Facility',
  'Infrastructure'
];

export const pccLevels = [
  'All',
  'PCC Level 1',
  'PCC Level 2',
  'Auto Paver',
  'Tracklayer'
];

export const getStructuresByCategory = (category) => {
  if (category === 'All') return structures;
  return structures.filter(structure => structure.category === category);
};

export const getStructuresByPCCLevel = (level) => {
  if (level === 'All') return structures;
  if (level === 'PCC Level 1') return structures.filter(s => s.pccLevel === 1);
  if (level === 'PCC Level 2') return structures.filter(s => s.pccLevel === 2);
  return structures.filter(s => s.pccLevel === level);
};

export const getMaterialTypes = () => [
  'metals',
  'ceramics', 
  'resins',
  'chemicals',
  'specialAlloys',
  'chiralCrystals'
];

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

