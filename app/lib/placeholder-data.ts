import 
{ 
  Action, 
  ActionName, 
  Campaign, 
  CampaignTitle, 
  DungeonMaster, 
  Item, 
  ItemName, 
  Location, 
  LocationItem, 
  LocationMonster, 
  LocationName, 
  Monster, 
  MonsterName,
  MonsterType
} from '@/app/lib/definitions';

// Defines all sample data used for offline testing.
export const campaigns: Campaign[] =
[
  {
    campaign_id: 1, 
    title: 'A Deep and Creeping Darkness', 
    start_date: '2024-01-16', 
    end_date: '2024-02-22', 
    dungeon_master: 'Marcus',
  },
  {
    campaign_id: 2, 
    title: 'The Price of Beauty', 
    start_date: '2022-04-16', 
    end_date: '2022-05-12', 
    dungeon_master: 'Liam Braxley',
  },
  {
    campaign_id: 3, 
    title: 'The Joy of Extradimensional Spaces', 
    start_date: '2023-03-30', 
    end_date: null, 
    dungeon_master: 'Brennan Lee Mulligan',
  },
];

export const locations: Location[] =
[
  {
    location_id: 1,
    campaign_name: 'A Deep and Creeping Darkness',
    location_name: 'Chamber of Weeping',
    location_description: 'Thick, velvety black moss covers every surface of this eight-foot-high chamber. Set into the far wall is a deep alcove.'
  },
  {
    location_id: 2,
    campaign_name: 'A Deep and Creeping Darkness',
    location_name: 'Southern Wing',
    location_description: 'This tunnel ends at a small chamber that holds worn picks, rusty shovels, and two hand carts filled with debris and rags.'
  },
  {
    location_id: 3,
    campaign_name: 'The Price of Beauty',
    location_name: 'Lobby',
    location_description: 'A large lobby, the air heavy with the scent of fresh lilies. A desk stands at the center of the room, holding neatly piled papers and fresh-cut lilies in a vase.'
  },
  {
    location_id: 4,
    campaign_name: 'The Price of Beauty',
    location_name: 'Ilmar\'s Room',
    location_description: 'A cluttered room whose occupant has been staying here for some time. Clothes and cosmetic products are scattered across the floor and desk.'
  },
  {
    location_id: 5,
    campaign_name: 'The Joy of Extradimensional Spaces',
    location_name: 'Library',
    location_description: 'Tall shelves filled with books line the walls of this room. Two more shelves run through the middle of the room with a ten-foot-wide aisle between them. Several stacks of books are piled high throughout the room. There are small reading desks with cozy scarlet chairs in the corners.'
  },
  {
    location_id: 6,
    campaign_name: 'The Joy of Extradimensional Spaces',
    location_name: 'Exercise Room',
    location_description: 'This room contains a battered wooden mannequin and a weapon rack holding staffs and daggers, all lit by indigo-tinted light streaming through a window. The floor is stained and scorched. At the far end of the room, a broom hovers in the air, sweeping the floor by itself!'
  },
];

export const items: Item[] =
[
  {
    item_id: 1,
    item_name: 'Amulet',
    value: 5,
    weight: 1
  },
  {
    item_id: 2,
    item_name: 'Chain Shirt',
    value: 50,
    weight: 20
  },
  {
    item_id: 3,
    item_name: 'Dagger',
    value: 2,
    weight: 1 
  },
  {
    item_id: 4,
    item_name: 'Quarterstaff',
    value: 0.2,
    weight: 4 
  },
  {
    item_id: 5,
    item_name: 'Dart',
    value: 0.05,
    weight: 0.25 
  },
];

export const monsters: Monster[] =
[
  {
    monster_id: 1,
    monster_name: 'Swarm of Bats',
    armor_class: 12,
    hit_points: 22,
    monster_type: 'Diminutive Animal'
  },
  {
    monster_id: 2,
    monster_name: 'Meenlock',
    armor_class: 15,
    hit_points: 31,
    monster_type: 'Fey'
  },
  {
    monster_id: 3,
    monster_name: 'Cambion',
    armor_class: 19,
    hit_points: 82,
    monster_type: 'Medium Fiend'
  },
  {
    monster_id: 4,
    monster_name: 'Swarm of Animated Books',
    armor_class: 12,
    hit_points: 22,
    monster_type: 'Medium Swarm of Tiny Constructs'
  },
  {
    monster_id: 5,
    monster_name: 'Animated Broom',
    armor_class: 15,
    hit_points: 17,
    monster_type: 'Small Construct'
  },
];

export const monsterLocationNames: LocationName[][] =
[
  [
    {
      location_name: 'Southern Wing'
    }
  ],
  [
    {
      location_name: 'Chamber of Weeping'
    }
  ],
  [
    {
      location_name: 'Lobby'
    }
  ],
  [
    {
      location_name: 'Library'
    }
  ],
  [
    {
      location_name: 'Exercise Room'
    }
  ],
];

export const actions: Action[] =
[
  {
    action_id: 1,
    monster_name: 'Swarm of Bats',
    action_name: 'Bites',
    description: 'Melee Weapon Attack: +4 to hit, reach 0 ft., one creature in the swarm\'s space. Hit: 5 (2d4) piercing damage, or 2 (1d4) piercing damage if the swarm has half of its hit points or fewer.'
  },
  {
    action_id: 2,
    monster_name: 'Meenlock',
    action_name: 'Shadow Teleport (Recharge 5-6).',
    description: 'As a bonus action, the meenlock can teleport to an unoccupied space within 30 feet of it, provided that both the space it\'s teleporting from and its destination are in dim light or darkness. The destination need not be within line of sight. and its destination are in dim light or darkness. The destination need not be within line of sight.'
  },
  {
    action_id: 3,
    monster_name: 'Cambion',
    action_name: 'Spear',
    description: 'Melee or Ranged Weapon Attack'
  },
  {
    action_id: 4,
    monster_name: 'Cambion',
    action_name: 'Fire Ray',
    description: 'Range Spell Attack'
  },
  {
    action_id: 5,
    monster_name: 'Searm of Animated Books',
    action_name: 'Book Club',
    description: 'Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm\'s space. Hit: 6 (2d4 + 1) bludgeoning damage, or 3 (1d4 + 1) bludgeoning damage if the swarm has half its hit points or fewer.'
  },
  {
    action_id: 6,
    monster_name: 'Animated Broom',
    action_name: 'Multiattack',
    description: 'The broom makes two melee attacks.'
  },
  {
    action_id: 7,
    monster_name: 'Animated Broom',
    action_name: 'Broomstick',
    description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) bludgeoning damage.'
  },
];

export const monsterActionNames: ActionName[][] =
[
  [
    {
      action_name: 'Bites'
    },
  ],
  [
    {
      action_name: 'Shadow Teleport (Recharge 5-6).'
    },
  ],
  [
    {
      action_name: 'Spear'
    },
    {
      action_name: 'Fire Ray'
    },
  ],
  [
    {
      action_name: 'Book Club'
    },
  ],
  [
    {
      action_name: 'Multiattack'
    },
    {
      action_name: 'Broomstick'
    },
  ],
];

export const locationsItems: LocationItem[] =
[
  {
    location_item_id: 1,
    location_name: 'Ilmar\'s Room',
    item_name: 'Amulet'
  },
  {
    location_item_id: 2,
    location_name: 'Ilmar\'s Room',
    item_name: 'Chain Shirt'
  },
  {
    location_item_id: 3,
    location_name: 'Exercise Room',
    item_name: 'Dagger'
  },
  {
    location_item_id: 4,
    location_name: 'Exercise Room',
    item_name: 'Quarterstaff'
  },
  {
    location_item_id: 5,
    location_name: 'Exercise Room',
    item_name: 'Dart'
  },
];

export const locationItemNames: ItemName[][] =
[
  [
  ],
  [
  ],
  [
  ],
  [
    {
      item_name: 'Amulet',
    },
    {
      item_name: 'Chain Shirt',
    },
  ],
  [
  ],
  [
    {
      item_name: 'Quarterstaff',
    },
    {
      item_name: 'Dart',
    },
  ],
];

export const itemLocationNames: LocationName[][] =
[
  [
    {
      location_name: 'Ilmar\'s Room'
    }
  ],
  [
    {
      location_name: 'Ilmar\'s Room'
    }
  ],
  [
    {
      location_name: 'Exercise Room'
    }
  ],
  [
    {
      location_name: 'Exercise Room'
    }
  ],
  [
    {
      location_name: 'Exercise Room'
    }
  ],
];


export const locationsMonsters: LocationMonster[] =
[
  {
    location_monster_id: 1,
    location_name: 'Southern Wing',
    monster_name: 'Swarm of Bats'
  },
  {
    location_monster_id: 2,
    location_name: 'Chamber of Weeping',
    monster_name: 'Meenlock'
  },
  {
    location_monster_id: 3,
    location_name: 'Lobby',
    monster_name: 'Cambion'
  },
  {
    location_monster_id: 4,
    location_name: 'Library',
    monster_name: 'Swarm of Animated Books'
  },
  {
    location_monster_id: 5,
    location_name: 'Exercise Room',
    monster_name: 'Animated Broom'
  },
];

export const locationMonsterNames: MonsterName[][] =
[
  [
    {
      monster_name: 'Meenlock',
    },
  ],
  [
    {
      monster_name: 'Swarm of Bats',
    },
  ],
  [
    {
      monster_name: 'Cambion',
    },
  ],
  [
  ],
  [
    {
      monster_name: 'Swarm of Animated Books',
    },
    {
      monster_name: 'Medium Swarm of Tiny Constructs',
    },
  ],
  [
    {
      monster_name: 'Animated Broom',
    },
  ],
];

export const locationNames: LocationName[] =
[
  {
    location_name: 'Chamber of Weeping',
  },
  {
    location_name: 'Southern Wing',
  },
  {
    location_name: 'Lobby',
  },
  {
    location_name: 'Ilmar\'s Room',
  },
  {
    location_name: 'Library',
  },
  {
    location_name: 'Exercise Room',
  },
];

export const dungeonMasters: DungeonMaster[] =
[
  {
    dungeon_master: 'Marcus'
  },
  {
    dungeon_master: 'Liam Braxley'
  },
  {
    dungeon_master: 'Mohamed'
  },
];

export const monsterTypes: MonsterType[] =
[
  {
    monster_type: 'Diminutive Animal'
  },
  {
    monster_type: 'Fey'
  },
  {
    monster_type: 'Medium Fiend'
  },
  {
    monster_type: 'Medium Swarm of Tiny Constructs'
  },
  {
    monster_type: 'Small Construct'
  },
];

export const monsterNames: MonsterName[] =
[
  {
    monster_name: 'Swarm of Bats'
  },
  {
    monster_name: 'Meenlock'
  },
  {
    monster_name: 'Cambion'
  },
  {
    monster_name: 'Swarm of Animated Books'
  },
  {
    monster_name: 'Animated Broom'
  },
];

export const campaignTitles: CampaignTitle[] =
[
  {
    campaign_title: 'A Deep and Creeping Darkness'
  },
  {
    campaign_title: 'The Price of Beauty'
  },
  {
    campaign_title: 'The Joy of Extradimensional Spaces'
  },
];

export const itemNames: ItemName[] =
[
  {
    item_name: 'Amulet'
  },
  {
    item_name: 'Chain Shirt'
  },
  {
    item_name: 'Dagger'
  },
  {
    item_name: 'Quarterstaff'
  },
  {
    item_name: 'Dart'
  },
];