// Seed data 
// See: https://nextjs.org/learn/dashboard-app/getting-started

import { Monster } from "@/app/lib/monsters-entity";

// Monster's table
export const monsters: Monster[] = [
  {
    monster_name: 'Swarm of Bats',
    armor_class: 12,
    hit_points: 22,
    monster_type: 'Diminutive Animal',
  },
  {
    monster_name: 'Meenlock',
    armor_class: 15,
    hit_points: 31,
    monster_type: 'Fey',
  },
];