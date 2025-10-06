// Death Stranding 2 - Structures Data
// Based on research from GameSpot and IGN wikis

export const structures = [
  // PCC Level 1 Structures
  {
    id: 'watchtower',
    name: 'Watchtower, Lv 2+',
    pccLevel: 1,
    category: 'Reconnaissance',
    description: 'Spy on enemy bases and reveal area information.',
    averageRequirements: {
      metals: 400,
      ceramics: 0,
      resins: 0,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 32
    },
    variableRequirements: false
  },
  {
    id: 'postbox',
    name: 'Postbox, Lv 2+',
    pccLevel: 1,
    category: 'Utility',
    description: 'Storage, recycling, fabrication, and hiding from enemies.',
    averageRequirements: {
      metals: 200,
      ceramics: 0,
      resins: 0,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 0
    },
    variableRequirements: false
  },
  {
    id: 'timefall-shelter',
    name: 'Timefall Shelter, Lv 2+',
    pccLevel: 1,
    category: 'Utility',
    description: 'Protection from Timefall weather and temporary BT barrier.',
    averageRequirements: {
      metals: 400,
      ceramics: 0,
      resins: 0,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 32
    },
    variableRequirements: false
  },
  {
    id: 'generator',
    name: 'Generator, Lv 2+',
    pccLevel: 1,
    category: 'Utility',
    description: 'Quickly recharge vehicle batteries. Critical for maintaining vehicle power.',
    averageRequirements: {
      metals: 400,
      ceramics: 0,
      resins: 0,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 0
    },
    variableRequirements: false
  },
  {
    id: 'bridge-30m',
    name: 'Bridge 30m, Lv 1',
    pccLevel: 1,
    category: 'Transportation',
    description: 'Cross rivers and obstacles. Adjustable length, requires metal donation to complete.',
    averageRequirements: {
      metals: 600,
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
    id: 'bridge-45m',
    name: 'Bridge 45m, Lv 1',
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
    id: 'bridge-80m',
    name: 'Bridge 80m, Lv 1',
    pccLevel: 1,
    category: 'Transportation',
    description: 'Cross rivers and obstacles. Adjustable length, requires metal donation to complete.',
    averageRequirements: {
      metals: 1200,
      ceramics: 0,
      resins: 0,
      chemicals: 0,
      specialAlloys: 0,
      chiralCrystals: 0
    },
    variableRequirements: true,
    notes: 'Material requirements vary based on bridge length and terrain'
  },
  
  // PCC Level 2 Structures
  {
    id: 'jump-ramp',
    name: 'Jump Ramp, Lv 2+',
    pccLevel: 2,
    category: 'Transportation',
    description: 'Vehicle and foot traversal with jump mechanics. Negates fall damage.',
    averageRequirements: {
      metals: 0,
      ceramics: 0,
      resins: 0,
      chemicals: 0,
      specialAlloys: 240,
      chiralCrystals: 480
    },
    variableRequirements: false
  },
  {
    id: 'zip-line',
    name: 'Zip-line, Lv 2+',
    pccLevel: 2,
    category: 'Transportation',
    description: 'Fast traversal across terrain. Default 300m length, upgradeable.',
    averageRequirements: {
      metals: 0,
      ceramics: 0,
      resins: 0,
      chemicals: 240,
      specialAlloys: 480,
      chiralCrystals: 0
    },
    variableRequirements: false,
    notes: 'Length can be upgraded with upgrade to level 2'
  },
  {
    id: 'transponder',
    name: 'Transponder, Lv 2+',
    pccLevel: 2,
    category: 'Transportation',
    description: 'Fast travel system (Beach Jump) to other transponders and facilities.',
    averageRequirements: {
      metals: 0,
      ceramics: 0,
      resins: 320,
      chemicals: 240,
      specialAlloys: 0,
      chiralCrystals: 0
    },
    variableRequirements: false,
    notes: 'Only equipped gear travels with player, cargo left behind'
  },
  {
    id: 'chiral-bridge',
    name: 'Chiral Bridge, Lv 2+',
    pccLevel: 2,
    category: 'Transportation',
    description: 'Mini version of the larger bridge, made out of pure chiral energy!',
    averageRequirements: {
      metals: 0,
      ceramics: 0,
      resins: 0,
      chemicals: 0,
      specialAlloys: 120,
      chiralCrystals: 720
    },
    variableRequirements: false,
    notes: 'Does not work during rain or snow.'
  },
  {
    id: 'safehouse',
    name: 'Safehouse, Lv 1',
    pccLevel: 2,
    category: 'Facility',
    description: 'Full facility functionality with private room and vehicle services.',
    averageRequirements: {
      metals: 0,
      ceramics: 0,
      resins: 960,
      chemicals: 0,
      specialAlloys: 960,
      chiralCrystals: 300
    },
    variableRequirements: false,
    notes: 'Requires significant investment but provides full facility services'
  },
  {
    id: 'hot-spring-digger',
    name: 'Hot Spring Digger, L2+',
    pccLevel: 2,
    category: 'Facility',
    description: 'Dig a hot spring for stamina regeneration and buffs.',
    averageRequirements: {
      metals: 10,
      ceramics: 10,
      resins: 10,
      chemicals: 10,
      specialAlloys: 10,
      chiralCrystals: 10
    },
    variableRequirements: false,
    notes: 'Must be placed near an underground water source; Material requirements unknown'
  },
  {
    id: 'cargo-catapult',
    name: 'Cargo Catapult, Lv 2+',
    pccLevel: 2,
    category: 'Transportation',
    description: 'Launch cargo over obstacles and terrain. Useful for hard-to-reach areas.',
    averageRequirements: {
      metals: 10,
      ceramics: 10,
      resins: 10,
      chemicals: 10,
      specialAlloys: 10,
      chiralCrystals: 10
    },
    variableRequirements: false,
    notes: 'Launches poorly uphills; best used for downhill or flat terrain. Material requirements unknown'
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

