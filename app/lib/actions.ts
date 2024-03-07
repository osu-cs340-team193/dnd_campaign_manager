'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PoolConnection } from 'mysql2/promise';
import mysql from '@/app/lib/db';
import Query from '@/app/lib/query';
import 
{ 
  Monster,
  MonsterFormState,
  CreateMonster,
  UpdateMonster,
  CampaignFormState,
  CreateCampaign,
  Campaign,
  UpdateCampaign,
  LocationFormState,
  CreateLocation,
  Location,
  UpdateLocation,
  ActionFormState,
  CreateAction,
  Action,
  UpdateAction,
  ItemFormState,
  CreateItem,
  Item,
  UpdateItem,
  LocationMonsterFormState,
  CreateLocationMonster,
  LocationMonster,
  UpdateLocationMonster,
  LocationItemFormState,
  CreateLocationItem,
  LocationItem,
  UpdateLocationItem,
} from '@/app/lib/definitions';
import 
{ 
  actions, 
  campaigns, 
  items, 
  locations, 
  locationsItems, 
  locationsMonsters 
} from '@/app/lib/placeholder-data';

// Data updating/deleting handlers 

// Citation for the following functions:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: General function structure and validation logic adapted from source.

/****************************************************************************************


Campaigns


*****************************************************************************************/

// POST /campaigns 
export async function createCampaign(prevState: CampaignFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend
  const validateFields = CreateCampaign.safeParse({
    title: formData.get('title'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date'),
    dungeon_master: formData.get('dungeon_master'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Campaign',
    };
  }

  // Convert form values into a valid type before sending to backend
  const campaign: Campaign =
  {
    title: validateFields.data.title,
    start_date: validateFields.data.start_date,
    end_date: validateFields.data.end_date,
    dungeon_master: validateFields.data.dungeon_master
  };

  campaigns.push(campaign);
  console.log(JSON.stringify(campaigns));

  // Attempt to send form data to backend
  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.addCampaign(connection, campaign);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Create Campaign.',
    };
  }
  finally
  {
    // Always release connection at end of transaction
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  // Since we added a new campaign, we want to force the campaigns page to update
  // its state to display it
  revalidatePath('/campaigns');

  // Send user back to campaigns page
  redirect('/campaigns');
}

// PUT /campaigns/{id}
export async function updateCampaignById(id: number, prevState: CampaignFormState, formData: FormData)
{
  const validateFields = UpdateCampaign.safeParse({
    title: formData.get('title'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date'),
    dungeon_master: formData.get('dungeon_master'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Campaign',
    };
  }

  const campaign: Campaign =
  {
    campaign_id: id,
    title: validateFields.data.title,
    start_date: validateFields.data.start_date,
    end_date: validateFields.data.end_date,
    dungeon_master: validateFields.data.dungeon_master
  };

  campaigns[id - 1] = campaign;
  console.log(JSON.stringify(campaigns));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.updateCampaignById(connection, campaign);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Update Campaign.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/campaigns');
  redirect('/campaigns');
}

// DELETE /campaigns/{id}
export async function deleteCampaignById(id: number)
{
  let connection: PoolConnection | null = null;

  try
  {
    connection = await mysql.createConnection();
    await Query.deleteCampaignById(connection, id);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Delete Campaign.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/campaigns');
  redirect('/campaigns');
}

/****************************************************************************************


Locations


*****************************************************************************************/

// POST /locations
export async function createLocation(prevState: LocationFormState, formData: FormData)
{
  const validateFields = CreateLocation.safeParse({
    campaign_name: formData.get('campaign_name'),
    location_name: formData.get('location_name'),
    location_description: formData.get('location_description'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Location',
    };
  }

  const location: Location =
  {
    campaign_name: validateFields.data.campaign_name,
    location_name: validateFields.data.location_name,
    location_description: validateFields.data.location_description,
  };

  locations.push(location);
  console.log(JSON.stringify(locations));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.addLocation(connection, location);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Create Location.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/locations');
  redirect('/locations');
}

// PUT /locations/{id}
export async function updateLocationById(id: number, prevState: LocationFormState, formData: FormData)
{
  const validateFields = UpdateLocation.safeParse({
    campaign_name: formData.get('campaign_name'),
    location_name: formData.get('location_name'),
    location_description: formData.get('location_description'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Location',
    };
  }

  const location: Location =
  {
    location_id: id,
    campaign_name: validateFields.data.campaign_name,
    location_name: validateFields.data.location_name,
    location_description: validateFields.data.location_description,
  };

  locations[id - 1] = location;
  console.log(JSON.stringify(locations));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.updateLocationById(connection, location);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Update Location.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/locations');
  redirect('/locations');
}

// DELETE /locations/{id}
export async function deleteLocationById(id: number)
{
  let connection: PoolConnection | null = null;

  try
  {
    connection = await mysql.createConnection();
    await Query.deleteLocationById(connection, id);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Delete Location.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/locations');
  redirect('/locations');
}

/****************************************************************************************


Monsters


*****************************************************************************************/

// POST /monsters
export async function createMonster(prevState: MonsterFormState, formData: FormData)
{
  const validateFields = CreateMonster.safeParse({
    monster_name: formData.get('monster_name'),
    armor_class: formData.get('armor_class'),
    hit_points: formData.get('hit_points'),
    monster_type: formData.get('monster_type'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Monster',
    };
  }

  const monster: Monster =
  {
    monster_name: validateFields.data.monster_name,
    armor_class: validateFields.data.armor_class,
    hit_points: validateFields.data.hit_points,
    monster_type: validateFields.data.monster_type
  };

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.addMonster(connection, monster);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Create Monster.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/monsters');
  redirect('/monsters');
}

// PUT /monsters/{id}
export async function updateMonsterById(id: number, prevState: MonsterFormState, formData: FormData)
{
  const validateFields = UpdateMonster.safeParse({
    monster_name: formData.get('monster_name'),
    armor_class: formData.get('armor_class'),
    hit_points: formData.get('hit_points'),
    monster_type: formData.get('monster_type'),
  });

  console.info(formData);

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Monster',
    };
  }

  const monster: Monster =
  {
    monster_id: id,
    monster_name: validateFields.data.monster_name,
    armor_class: validateFields.data.armor_class,
    hit_points: validateFields.data.hit_points,
    monster_type: validateFields.data.monster_type
  };

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.updateMonsterById(connection, monster);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Update Monster.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/monsters');
  redirect('/monsters');
}

// DELETE /monsters/{id}
export async function deleteMonsterById(id: number)
{
  let connection: PoolConnection | null = null;

  try
  {
    connection = await mysql.createConnection();
    await Query.deleteMonsterById(connection, id);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Delete Monster.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/monsters');
  redirect('/monsters');
}

/****************************************************************************************


Actions


*****************************************************************************************/

// POST /actions
export async function createAction(prevState: ActionFormState, formData: FormData)
{
  const validateFields = CreateAction.safeParse({
    action_name: formData.get('action_name'),
    monster_name: formData.get('monster_name'),
    description: formData.get('description'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Action',
    };
  }

  const action: Action =
  {
    action_name: validateFields.data.action_name,
    monster_name: validateFields.data.monster_name,
    description: validateFields.data.description,
  };

  actions.push(action);
  console.log(JSON.stringify(actions));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.addAction(connection, action);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Create Action.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/actions');
  redirect('/actions');
}

// PUT /actions/{id}
export async function updateActionById(id: number, prevState: ActionFormState, formData: FormData)
{
  const validateFields = UpdateAction.safeParse({
    action_name: formData.get('action_name'),
    monster_name: formData.get('monster_name'),
    description: formData.get('description'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Action',
    };
  }

  const action: Action =
  {
    action_id: id,
    action_name: validateFields.data.action_name,
    monster_name: validateFields.data.monster_name,
    description: validateFields.data.description,
  };

  actions[id - 1] = action;
  console.log(JSON.stringify(actions));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.updateActionById(connection, action);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Update Action.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/actions');
  redirect('/actions');
}

// DELETE /actions/{id}
export async function deleteActionById(id: number)
{
  let connection: PoolConnection | null = null;

  try
  {
    connection = await mysql.createConnection();
    await Query.deleteActionById(connection, id);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Delete Action.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/actions');
  redirect('/actions');
}

/****************************************************************************************


Items


*****************************************************************************************/

// POST /items
export async function createItem(prevState: ItemFormState, formData: FormData)
{
  const validateFields = CreateItem.safeParse({
    item_name: formData.get('item_name'),
    value: formData.get('value'),
    weight: formData.get('weight'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Item',
    };
  }

  const item: Item =
  {
    item_name: validateFields.data.item_name,
    value: validateFields.data.value,
    weight: validateFields.data.weight,
  };

  items.push(item);
  console.log(JSON.stringify(items));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.addItem(connection, item);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Create Item.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/items');
  redirect('/items');
}

// PUT /items/{id}
export async function updateItemById(id: number, prevState: ItemFormState, formData: FormData)
{
  const validateFields = UpdateItem.safeParse({
    item_name: formData.get('item_name'),
    value: formData.get('value'),
    weight: formData.get('weight'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Action',
    };
  }

  const item: Item =
  {
    item_id: id,
    item_name: validateFields.data.item_name,
    value: validateFields.data.value,
    weight: validateFields.data.weight,
  };

  items[id - 1] = item;
  console.log(JSON.stringify(items));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.updateItemById(connection, item);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Update Item.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/items');
  redirect('/items');
}

// DELETE /items/{id}
export async function deleteItemById(id: number)
{
  let connection: PoolConnection | null = null;

  try
  {
    connection = await mysql.createConnection();
    await Query.deleteItemById(connection, id);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Delete Item.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/items');
  redirect('/items');
}

/****************************************************************************************


Locations_Monsters


*****************************************************************************************/

// POST /locations-monsters
export async function createLocationMonster(prevState: LocationMonsterFormState, formData: FormData)
{
  const validateFields = CreateLocationMonster.safeParse({
    location_name: formData.get('location_name'),
    monster_name: formData.get('monster_name'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Location Monster',
    };
  }

  const locationMonster: LocationMonster =
  {
    location_name: validateFields.data.location_name,
    monster_name: validateFields.data.monster_name,
  };

  locationsMonsters.push(locationMonster);
  console.log(JSON.stringify(locationsMonsters));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.addLocationMonster(connection, locationMonster);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Create Location Monster.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/locations-monsters');
  redirect('/locations-monsters');
}

// PUT /locations-monsters/{id}
export async function updateLocationMonsterById(id: number, prevState: LocationMonsterFormState, formData: FormData)
{
  const validateFields = UpdateLocationMonster.safeParse({
    location_name: formData.get('location_name'),
    monster_name: formData.get('monster_name'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Action',
    };
  }

  const locationMonster: LocationMonster =
  {
    location_monster_id: id,
    location_name: validateFields.data.location_name,
    monster_name: validateFields.data.monster_name,
  };

  locationsMonsters[id - 1] = locationMonster;
  console.log(JSON.stringify(locationsMonsters));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.updateLocationMonsterById(connection, locationMonster);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Update Location Monster.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/locations-monsters');
  redirect('/locations-monsters');
}

// DELETE /locations-monsters/{id}
export async function deleteLocationMonsterById(id: number)
{
  let connection: PoolConnection | null = null;

  try
  {
    connection = await mysql.createConnection();
    await Query.deleteLocationMonsterById(connection, id);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Delete Location Monster.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/locations-monsters');
  redirect('/locations-monsters');
}

/****************************************************************************************


Locations_Items


*****************************************************************************************/

// POST /locations-items
export async function createLocationItem(prevState: LocationItemFormState, formData: FormData)
{
  const validateFields = CreateLocationItem.safeParse({
    location_name: formData.get('location_name'),
    item_name: formData.get('item_name'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Location Item',
    };
  }

  const locationItem: LocationItem =
  {
    location_name: validateFields.data.location_name,
    item_name: validateFields.data.item_name,
  };

  locationsItems.push(locationItem);
  console.log(JSON.stringify(locationsItems));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.addLocationItem(connection, locationItem);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Create Location Item.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/locations-items');
  redirect('/locations-items');
}

// PUT /locations-items/{id}
export async function updateLocationItemById(id: number, prevState: LocationItemFormState, formData: FormData)
{
  const validateFields = UpdateLocationItem.safeParse({
    location_name: formData.get('location_name'),
    item_name: formData.get('item_name'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Location Item',
    };
  }

  const locationItem: LocationItem =
  {
    location_item_id: id,
    location_name: validateFields.data.location_name,
    item_name: validateFields.data.item_name,
  };

  locationsItems[id - 1] = locationItem;
  console.log(JSON.stringify(locationsItems));

  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await Query.updateLocationItemById(connection, locationItem);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Update Location Item.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/locations-items');
  redirect('/locations-items');
}

// DELETE /locations-items/{id}
export async function deleteLocationItemById(id: number)
{
  let connection: PoolConnection | null = null;

  try
  {
    connection = await mysql.createConnection();
    await Query.deleteLocationItemById(connection, id);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Delete Location Item.',
    };
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  revalidatePath('/locations-items');
  redirect('/locations-items');
}