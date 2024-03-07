import 
{ 
  RowDataPacket 
} from 'mysql2/promise';

// Type validation utilities for form data.
import { z } from 'zod';

/****************************************************************************************


Campaigns


*****************************************************************************************/

// Campaign type.
export type Campaign = 
{
  campaign_id?: number;
  title: string;
  start_date: string | null;
  end_date: string | null;
  dungeon_master: string;
};

// https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida
export interface ICampaign extends RowDataPacket
{
  campaign_id?: number;
  title: string;
  start_date: string | null;
  end_date: string | null;
  dungeon_master: string;
};

export type CampaignTitle =
{
  title: string;
};

export interface ICampaignTitle extends RowDataPacket
{
  title: string;
};

export type DungeonMaster =
{
  dungeon_master: string;
};

export interface IDungeonMaster extends RowDataPacket
{
  dungeon_master: string;
};

export type CampaignFormState = 
{
  errors?: {
    title?: string[];
    start_date?: string[];
    end_date?: string[];
    dungeon_master?: string[];
  };
  message?: string | null;
};

// Citation for the following variable:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Variable structure adapted from source.
// Defines what a valid campaign form submission looks like. POST API endpoints
// for the campaign entity then use this for form validation.
export const CampaignFormSchema = z.object({
  id: z.any(),
  title: z.any(),
  start_date: z.any(),
  end_date: z.any(),
  dungeon_master: z.any(),
});

// Since the user won't submit ID with the form, we can omit it from the validation step.
export const CreateCampaign = CampaignFormSchema.omit({ id: true });
export const UpdateCampaign = CampaignFormSchema.omit({ id: true });

/****************************************************************************************


Locations


*****************************************************************************************/

export type LocationTableRow =
{
  location_id: number;
  location_name: string;
  campaign_name: string;
  location_description: string;
  location_monsters: string;
  location_items: string;
};

// Location type.
export type Location = 
{
  location_id?: number;
  location_name: string;
  campaign_name: string;
  location_description: string | null;
};

export type LocationName =
{
  location_name: string | null;
};

// https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida
export interface ILocation extends RowDataPacket
{
  location_id?: number;
  location_name: string;
  campaign_name: string;
  location_description: string | null;
};

// https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida
export interface ILocationName extends RowDataPacket
{
  location_name: string | null;
};

export type LocationFormState = 
{
  errors?: {
    location_name?: string[];
    campaign_name?: string[];
    location_description?: string[];
    location_monsters?: string[];
    location_items?: string[];
  };
  message?: string | null;
};

// Citation for the following variable:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Variable structure adapted from source.
// Defines what a valid location form submission looks like. POST API endpoints
// for the location entity then use this for form validation.
export const LocationFormSchema = z.object({
  id: z.any(),
  location_name: z.any(),
  campaign_name: z.any(),
  location_description: z.any(),
  location_monsters: z.any(),
  location_items: z.any(),
});

// Since the user won't submit ID with the form, we can omit it from the validation step.
export const CreateLocation = LocationFormSchema.omit({ id: true });
export const UpdateLocation = LocationFormSchema.omit({ id: true });

/****************************************************************************************


Monsters


*****************************************************************************************/

export type MonsterTableRow =
{
  monster_id: number;
  monster_name: string;
  armor_class: number;
  hit_points: number;
  monster_type: string;
  monster_actions: string;
  monster_locations: string;
};

// Monster type.
export type Monster = 
{
  monster_id?: number;
  monster_name: string;
  armor_class: number;
  hit_points: number;
  monster_type: string;
};

// https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida
export interface IMonster extends RowDataPacket
{
  monster_id: number;
  monster_name: string;
  armor_class: number;
  hit_points: number;
  monster_type: string;
};

export type MonsterName =
{
  monster_name: string;
};

export interface IMonsterName extends RowDataPacket
{
  monster_name: string;
};

export type MonsterType =
{
  monster_type: string;
};

export interface IMonsterType extends RowDataPacket
{
  monster_type: string;
};

export type MonsterFormState = 
{
  errors?: {
    monster_name?: string[];
    armor_class?: string[];
    hit_points?: string[];
    monster_type?: string[];
  };
  message?: string | null;
};

// Citation for the following variable:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Variable structure adapted from source.
// Defines what a valid monster form submission looks like. POST API endpoints
// for the monster entity then use this for form validation.
export const MonsterFormSchema = z.object({
  id: z.number(),

  monster_name: z
    .string({
      required_error: 'Please enter a valid monster name',
    })
    .trim()
    .min(2, {
      message: 'Monster name should be at least 2 characters long'
    }),

  armor_class: z
    .coerce
    .number()
    .gt(0, {
      message: 'Please enter an armor class greater than 0.'
    }),

  hit_points: z
    .coerce
    .number()
    .gt(0, {
      message: 'Please enter a hit point value greater than 0.'
    }),

  // Regex refine: https://stackoverflow.com/a/75516346
  // chars regex: https://stackoverflow.com/a/12778207
  monster_type: z
    .string({
      required_error: 'Please select a monster type.'
    })
    .trim()
    .min(2, {
      message: 'Monster type should be at least 2 characters long'
    })
    .refine((value) => 
      /^[a-zA-Z\s]*$/.test(value), {
        message: 'Monster type should contain only characters and whitespace' 
    })
});

// Since the user won't submit ID with the form, we can omit it from the validation step.
export const CreateMonster = MonsterFormSchema.omit({ id: true });
export const UpdateMonster = MonsterFormSchema.omit({ id: true });

/****************************************************************************************


Actions


*****************************************************************************************/

export type ActionName =
{
  action_name: string;
};

export interface IActionName extends RowDataPacket
{
  action_name: string;
};

// Action type.
export type Action = 
{
  action_id?: number;
  action_name: string;
  monster_name: string | null;
  description: string | null;
};

// https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida
export interface IAction extends RowDataPacket
{
  action_id?: number;
  action_name: string;
  monster_name: string | null;
  description: string | null;
};

export type ActionFormState = 
{
  errors?: {
    monster_name?: string[];
    action_name?: string[];
    description?: string[];
  };
  message?: string | null;
};

// Citation for the following variable:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Variable structure adapted from source.
// Defines what a valid action form submission looks like. POST API endpoints
// for the action entity then use this for form validation.
export const ActionFormSchema = z.object({
  id: z.any(),
  monster_name: z.any(),
  action_name: z.any(),
  description: z.any(),
});

// Since the user won't submit ID with the form, we can omit it from the validation step.
export const CreateAction = ActionFormSchema.omit({ id: true });
export const UpdateAction = ActionFormSchema.omit({ id: true });

/****************************************************************************************


Items


*****************************************************************************************/

export type ItemTableRow =
{
  item_id: number;
  item_name: string;
  value: number;
  weight: number;
  item_locations: string;
};

// Item type.
export type Item = 
{
  item_id?: number;
  item_name: string;
  value: number | null;
  weight: number | null;
};

// https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida
export interface IItem extends RowDataPacket
{
  item_id?: number;
  item_name: string;
  value: number | null;
  weight: number | null;
};

export type ItemName =
{
  item_name: string;
};

export interface IItemName extends RowDataPacket
{
  item_name: string;
};

export type ItemFormState = 
{
  errors?: {
    item_name?: string[];
    value?: string[];
    weight?: string[];
    item_locations?: string[];
  };
  message?: string | null;
};

// Citation for the following variable:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Variable structure adapted from source.
// Defines what a valid item form submission looks like. POST API endpoints
// for the item entity then use this for form validation.
export const ItemFormSchema = z.object({
  id: z.any(),
  item_name: z.any(),
  value: z.any(),
  weight: z.any(),
  item_locations: z.any(),
});

// Since the user won't submit ID with the form, we can omit it from the validation step.
export const CreateItem = ItemFormSchema.omit({ id: true });
export const UpdateItem = ItemFormSchema.omit({ id: true });

/****************************************************************************************


Locations_Monsters


*****************************************************************************************/

// Item type.
export type LocationMonster = 
{
  location_monster_id?: number;
  location_name: string;
  monster_name: string;
};

// https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida
export interface ILocationMonster extends RowDataPacket
{
  location_monster_id?: number;
  location_name: string;
  monster_name: string;
};

export type LocationMonsterFormState = 
{
  errors?: {
    location_name?: string[];
    monster_name?: string[];
  };
  message?: string | null;
};

// Citation for the following variable:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Variable structure adapted from source.
// Defines what a valid location monster form submission looks like. POST API endpoints
// for the location monster entity then use this for form validation.
export const LocationMonsterFormSchema = z.object({
  location_name: z.any(),
  monster_name: z.any(),
});

// Since the user won't submit ID with the form, we can omit it from the validation step.
export const CreateLocationMonster = LocationMonsterFormSchema;
export const UpdateLocationMonster = LocationMonsterFormSchema;

/****************************************************************************************


Locations_Items


*****************************************************************************************/

// Item type.
export type LocationItem = 
{
  location_item_id?: number;
  location_name: string;
  item_name: string;
};

// https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida
export interface ILocationItem extends RowDataPacket
{
  location_item_id?: number;
  location_name: string;
  item_name: string;
};

export type LocationItemFormState = 
{
  errors?: {
    location_name?: string[];
    item_name?: string[];
  };
  message?: string | null;
};

// Citation for the following variable:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Variable structure adapted from source.
// Defines what a valid location item form submission looks like. POST API endpoints
// for the location item entity then use this for form validation.
export const LocationItemFormSchema = z.object({
  location_name: z.any(),
  item_name: z.any(),
});

// Since the user won't submit ID with the form, we can omit it from the validation step.
export const CreateLocationItem = LocationItemFormSchema;
export const UpdateLocationItem = LocationItemFormSchema;