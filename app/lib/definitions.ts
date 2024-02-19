// Database types.
// See: https://nextjs.org/learn/dashboard-app/getting-started

// Monster type.
export type Monster = {
  id: number;
  monster_name: string;
  armor_class: number;
  hit_points: number;
  monster_type: string;
};

export type MonsterForm = {
  id: number;
  monster_name: string;
  armor_class: number;
  hit_points: number;
  monster_type: string;
};