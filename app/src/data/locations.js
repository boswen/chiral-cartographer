// Death Stranding 2 - Locations Data
// Based on research from IGN wikis and game mechanics

export const Preppers = [
  {
    id: 'ciudad-nudo-del-norte',
    name: 'Ciudad Nudo del Norte (C1)',
    type: 'Facility',
    region: 'Mexico',
    unlockRequirement: 'Complete Main Order #2',
    connectionLevels: {
      1: {
        rewards: ['Chiral Network Established', 'Blood Bag', 'Container Repair Spray', 'Ladder', 'Climbing Anchor', 'Transporter Boots', 'Assault Rifle [MP] Lv1', 'Maser Handgun']
      },
      2: {
        rewards: ['Machine Pistol [MP]']
      },
      3: {
        rewards: ['SL Machine Pistol [MP]']
      },
      4: {
        rewards: ['Big-Bore Handgun [MP]']
      },
      5: {
        rewards: ['Custom Hologram: Norberto Puento', 'Patch 31: Mexico Cryptobiote']
      }
    },
    defaultMaterials: {
      metals: 200,
      ceramics: 150,
      resins: 100,
      chemicals: 75,
      specialAlloys: 50,
      chiralCrystals: 300
    }
  },
  {
    id: 'villa-libre',
    name: 'Villa Libre',
    type: 'Prepper',
    region: 'Mexico',
    unlockRequirement: 'Complete Main Order #3',
    connectionLevels: {
      1: {
        rewards: ['Chiral Network Established', 'PCC Lv1 (Watchtower, Postbox Structures)']
      },
      2: {
        rewards: ['Custom Electric Rod']
      },
      3: {
        rewards: ['Custom High-Voltage Rod']
      },
      4: {
        rewards: ['Custom Twin Rod']
      },
      5: {
        rewards: ['Custom Hologram: La Madre', 'Patch 54: Chiral Rodent']
      }
    },
    defaultMaterials: {
      metals: 150,
      ceramics: 200,
      resins: 120,
      chemicals: 80,
      specialAlloys: 40,
      chiralCrystals: 250
    }
  },
  {
    id: 'c1-south-distribution',
    name: 'C1 South Distribution Center',
    type: 'Facility',
    region: 'Mexico',
    unlockRequirement: 'Complete Main Order #4',
    connectionLevels: {
      1: {
        rewards: ['Chiral Network Established', 'Blood Grenade Lv1', 'PCC Lv1 (Timefall Shelter Structure)']
      },
      2: {
        rewards: ['EX Grenade']
      },
      3: {
        rewards: ['Blood Grenade Lv2']
      },
      4: {
        rewards: ['Assault Rifle [MP] Lv2']
      },
      5: {
        rewards: ['Custom Hologram: Benjamin Rivera', 'Patch 25: Smile', 'APAS Enhancement: Improved Cannon Cooldown']
      }
    },
    defaultMaterials: {
      metals: 180,
      ceramics: 160,
      resins: 90,
      chemicals: 110,
      specialAlloys: 60,
      chiralCrystals: 280
    }
  },
  {
    id: 'former-geophysics-lab',
    name: 'Former Geophysics Research Lab',
    type: 'Facility',
    region: 'Mexico',
    unlockRequirement: 'Complete Main Order #5',
    connectionLevels: {
      1: {
        rewards: ['Chiral Network Established', 'MP Bullet Anti-BT Effect', 'PCC Lv1 (Generator Structure)', 'PCC Lv1 (Bridge (Foundation) Structure)']
      },
      2: {
        rewards: ['Tri-Cruiser Additional Armor']
      },
      3: {
        rewards: ['LW Assault Rifle (MP) Lv1']
      },
      4: {
        rewards: ['LW Assault Rifle [MP] Lv2']
      },
      5: {
        rewards: ['Custom Hologram: Deadman', 'Custom Hologram: Alex Weatherstone', 'Patch 57: Tri-Cruiser']
      }
    },
    defaultMaterials: {
      metals: 220,
      ceramics: 140,
      resins: 110,
      chemicals: 90,
      specialAlloys: 70,
      chiralCrystals: 320
    }
  },
  {
    id: 'the-bokka',
    name: 'The Bokka',
    type: 'Prepper',
    region: 'Mexico',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 100,
      ceramics: 120,
      resins: 80,
      chemicals: 60,
      specialAlloys: 30,
      chiralCrystals: 200
    }
  },
  {
    id: 'the-artist',
    name: 'The Artist',
    type: 'Prepper',
    region: 'Mexico',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 90,
      ceramics: 110,
      resins: 70,
      chemicals: 50,
      specialAlloys: 25,
      chiralCrystals: 180
    }
  },

  // Australia Facilities
  {
    id: 'the-governments-base',
    name: "The Government's Base",
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 400,
      ceramics: 300,
      resins: 200,
      chemicals: 150,
      specialAlloys: 100,
      chiralCrystals: 300
    }
  },
  {
    id: 'the-lone-commander',
    name: 'The Lone Commander',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 150,
      ceramics: 100,
      resins: 75,
      chemicals: 50,
      specialAlloys: 25,
      chiralCrystals: 100
    }
  },
  {
    id: 'western-environmental-observatory',
    name: 'Western Environmental Observatory',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 200,
      ceramics: 150,
      resins: 100,
      chemicals: 200,
      specialAlloys: 50,
      chiralCrystals: 150
    }
  },
  {
    id: 'west-fort-knot-f1',
    name: 'West Fort Knot (F1)',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 350,
      ceramics: 250,
      resins: 175,
      chemicals: 125,
      specialAlloys: 75,
      chiralCrystals: 250
    }
  },
  {
    id: 'rainbow-valley',
    name: 'Rainbow Valley',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 100,
      ceramics: 75,
      resins: 125,
      chemicals: 50,
      specialAlloys: 25,
      chiralCrystals: 75
    }
  },
  {
    id: 'rainys-shelter',
    name: "Rainy's Shelter",
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 75,
      ceramics: 50,
      resins: 100,
      chemicals: 75,
      specialAlloys: 15,
      chiralCrystals: 50
    }
  },
  {
    id: 'the-musician',
    name: 'The Musician',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 100,
      ceramics: 75,
      resins: 50,
      chemicals: 25,
      specialAlloys: 20,
      chiralCrystals: 75
    }
  },
  {
    id: 'the-inventor',
    name: 'The Inventor',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 125,
      ceramics: 100,
      resins: 75,
      chemicals: 100,
      specialAlloys: 50,
      chiralCrystals: 100
    }
  },
  {
    id: 'animal-shelter',
    name: 'Animal Shelter',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 150,
      ceramics: 100,
      resins: 125,
      chemicals: 75,
      specialAlloys: 25,
      chiralCrystals: 125
    }
  },
  {
    id: 'f2-south-distribution-centre',
    name: 'F2 South Distribution Centre',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 300,
      ceramics: 200,
      resins: 150,
      chemicals: 100,
      specialAlloys: 75,
      chiralCrystals: 200
    }
  },
  {
    id: 'northern-environmental-observatory',
    name: 'Northern Environmental Observatory',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 200,
      ceramics: 150,
      resins: 100,
      chemicals: 200,
      specialAlloys: 50,
      chiralCrystals: 150
    }
  },
  {
    id: 'the-dowser',
    name: 'The Dowser',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 75,
      ceramics: 50,
      resins: 75,
      chemicals: 100,
      specialAlloys: 25,
      chiralCrystals: 75
    }
  },
  {
    id: 'the-architect',
    name: 'The Architect',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 150,
      ceramics: 200,
      resins: 100,
      chemicals: 50,
      specialAlloys: 75,
      chiralCrystals: 125
    }
  },
  {
    id: 'the-metagenomicist',
    name: 'The Metagenomicist',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 100,
      ceramics: 75,
      resins: 50,
      chemicals: 150,
      specialAlloys: 25,
      chiralCrystals: 100
    }
  },
  {
    id: 'the-fisherman',
    name: 'The Fisherman',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 75,
      ceramics: 50,
      resins: 100,
      chemicals: 25,
      specialAlloys: 15,
      chiralCrystals: 50
    }
  },
  {
    id: 'heartmans-lab',
    name: "Heartman's Lab",
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 200,
      ceramics: 150,
      resins: 100,
      chemicals: 250,
      specialAlloys: 75,
      chiralCrystals: 200
    }
  },
  {
    id: 'the-pizza-chef',
    name: 'The Pizza Chef',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 50,
      ceramics: 75,
      resins: 25,
      chemicals: 15,
      specialAlloys: 10,
      chiralCrystals: 25
    }
  },
  {
    id: 'the-data-scientist',
    name: 'The Data Scientist',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 100,
      ceramics: 75,
      resins: 50,
      chemicals: 125,
      specialAlloys: 50,
      chiralCrystals: 100
    }
  },
  {
    id: 'the-pioneer',
    name: 'The Pioneer',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 125,
      ceramics: 100,
      resins: 150,
      chemicals: 75,
      specialAlloys: 25,
      chiralCrystals: 100
    }
  },
  {
    id: 'the-motherhood',
    name: 'The Motherhood',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 100,
      ceramics: 125,
      resins: 75,
      chemicals: 50,
      specialAlloys: 25,
      chiralCrystals: 75
    }
  },
  {
    id: 'the-mechanic',
    name: 'The Mechanic',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 200,
      ceramics: 100,
      resins: 75,
      chemicals: 50,
      specialAlloys: 100,
      chiralCrystals: 125
    }
  },
  {
    id: 'the-ghost-hunter',
    name: 'The Ghost Hunter',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 75,
      ceramics: 50,
      resins: 25,
      chemicals: 100,
      specialAlloys: 25,
      chiralCrystals: 75
    }
  },
  {
    id: 'the-chronobiologist',
    name: 'The Chronobiologist',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 100,
      ceramics: 75,
      resins: 50,
      chemicals: 150,
      specialAlloys: 50,
      chiralCrystals: 100
    }
  },
  {
    id: 'east-fort-knot-f4',
    name: 'East Fort Knot (F4)',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 350,
      ceramics: 250,
      resins: 175,
      chemicals: 125,
      specialAlloys: 75,
      chiralCrystals: 250
    }
  },
  {
    id: 'the-tar-therapist',
    name: 'The Tar Therapist',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 75,
      ceramics: 100,
      resins: 50,
      chemicals: 125,
      specialAlloys: 25,
      chiralCrystals: 75
    }
  },
  {
    id: 'south-fort-knot-f6',
    name: 'South Fort Knot (F6)',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 350,
      ceramics: 250,
      resins: 175,
      chemicals: 125,
      specialAlloys: 75,
      chiralCrystals: 250
    }
  },
  {
    id: 'southern-environmental-observatory',
    name: 'Southern Environmental Observatory',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 200,
      ceramics: 150,
      resins: 100,
      chemicals: 200,
      specialAlloys: 50,
      chiralCrystals: 150
    }
  },
  {
    id: 'f7-north-distribution-centre',
    name: 'F7 North Distribution Centre',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 300,
      ceramics: 200,
      resins: 150,
      chemicals: 100,
      specialAlloys: 75,
      chiralCrystals: 200
    }
  },
  {
    id: 'bpas',
    name: 'BPAS',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 250,
      ceramics: 200,
      resins: 150,
      chemicals: 175,
      specialAlloys: 100,
      chiralCrystals: 225
    }
  },
  {
    id: 'the-phantom-smith',
    name: 'The Phantom Smith',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 150,
      ceramics: 100,
      resins: 75,
      chemicals: 50,
      specialAlloys: 125,
      chiralCrystals: 100
    }
  },
  {
    id: 'eastern-environmental-observatory',
    name: 'Eastern Environmental Observatory',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 200,
      ceramics: 150,
      resins: 100,
      chemicals: 200,
      specialAlloys: 50,
      chiralCrystals: 150
    }
  },
  {
    id: 'the-aeronautical-engineer',
    name: 'The Aeronautical Engineer',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 175,
      ceramics: 125,
      resins: 100,
      chemicals: 75,
      specialAlloys: 150,
      chiralCrystals: 125
    }
  },
  {
    id: 'f5-east-distribution-centre',
    name: 'F5 East Distribution Centre',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 300,
      ceramics: 200,
      resins: 150,
      chemicals: 100,
      specialAlloys: 75,
      chiralCrystals: 200
    }
  },
  {
    id: 'mr-impossible',
    name: 'Mr. Impossible',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 100,
      ceramics: 75,
      resins: 125,
      chemicals: 100,
      specialAlloys: 50,
      chiralCrystals: 100
    }
  },
  {
    id: 'the-adventurer',
    name: 'The Adventurer',
    type: 'Prepper',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 125,
      ceramics: 100,
      resins: 150,
      chemicals: 75,
      specialAlloys: 25,
      chiralCrystals: 100
    }
  },
  {
    id: 'terminal-fort-knot',
    name: 'Terminal Fort Knot',
    type: 'Facility',
    region: 'Australia',
    unlockRequirement: 'TBD',
    connectionLevels: {
      1: { rewards: ['Chiral Network Established'] },
      2: { rewards: ['TBD'] },
      3: { rewards: ['TBD'] },
      4: { rewards: ['TBD'] },
      5: { rewards: ['TBD'] }
    },
    defaultMaterials: {
      metals: 400,
      ceramics: 300,
      resins: 200,
      chemicals: 150,
      specialAlloys: 100,
      chiralCrystals: 300
    }
  }
];

export const mines = [
  {
    id: 'smoke-hill-mine',
    name: 'Smoke Hill Mine',
    type: 'mine',
    region: 'Mexico',
    materialType: 'ceramics',
    unlockRequirement: 'Sub Order 104: Restore Smoke Hill Mine',
    chiralCrystalsRequired: 800,
    materialOutput: 960,
    conversionRate: 1.2,
    upgradeable: true,
    upgradeMultiplier: 1.5
  },
  {
    id: 'mine-north-of-f1',
    name: 'Mine North of F1',
    type: 'mine',
    region: 'Australia',
    materialType: 'specialAlloys',
    unlockRequirement: 'Main Order 13: Restore the Monorail and Deliver Special Alloys to F1',
    chiralCrystalsRequired: 2000,
    materialOutput: 4800,
    conversionRate: 2.4,
    upgradeable: true,
    upgradeMultiplier: 1.5
  },
  {
    id: 'twin-valley-mine',
    name: 'Twin Valley Mine',
    type: 'mine',
    region: 'Australia',
    materialType: 'chemicals',
    unlockRequirement: 'TBD',
    chiralCrystalsRequired: 1200,
    materialOutput: 720,
    conversionRate: 0.6,
    upgradeable: true,
    upgradeMultiplier: 1.5
  },
  {
    id: 'mine-north-of-tar-lake',
    name: 'Mine North of Tar Lake',
    type: 'mine',
    region: 'Australia',
    materialType: 'ceramics',
    unlockRequirement: 'TBD',
    chiralCrystalsRequired: 1600,
    materialOutput: 3200,
    conversionRate: 2.0,
    upgradeable: true,
    upgradeMultiplier: 1.5
  },
  {
    id: 'mine-near-f3-crater',
    name: 'Mine Near F3 Crater',
    type: 'mine',
    region: 'Australia',
    materialType: 'resins',
    unlockRequirement: 'TBD',
    chiralCrystalsRequired: 1000,
    materialOutput: 3200,
    conversionRate: 3.2,
    upgradeable: true,
    upgradeMultiplier: 1.5
  },
  {
    id: 'savanna-mine',
    name: 'Savanna Mine',
    type: 'mine',
    region: 'Australia',
    materialType: 'specialAlloys',
    unlockRequirement: 'TBD',
    chiralCrystalsRequired: 900,
    materialOutput: 1920,
    conversionRate: 2.13,
    upgradeable: true,
    upgradeMultiplier: 1.5
  },
  {
    id: 'northeastern-mine',
    name: 'Northeastern Mine',
    type: 'mine',
    region: 'Australia',
    materialType: 'metals',
    unlockRequirement: 'TBD',
    chiralCrystalsRequired: 1200,
    materialOutput: 4000,
    conversionRate: 3.33,
    upgradeable: true,
    upgradeMultiplier: 1.5
  },
  {
    id: 'mine-north-of-f6',
    name: 'Mine North of F6',
    type: 'mine',
    region: 'Australia',
    materialType: 'resins',
    unlockRequirement: 'TBD',
    chiralCrystalsRequired: 1000,
    materialOutput: 3200,
    conversionRate: 3.2,
    upgradeable: true,
    upgradeMultiplier: 1.5
  },
  {
    id: 'south-edge-mine',
    name: 'South Edge Mine',
    type: 'mine',
    region: 'Australia',
    materialType: 'metals',
    unlockRequirement: 'TBD',
    chiralCrystalsRequired: 600,
    materialOutput: 1200,
    conversionRate: 2.0,
    upgradeable: true,
    upgradeMultiplier: 1.5
  }
];

export const allLocations = [...Preppers, ...mines];

