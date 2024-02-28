// POST API endpoints for all entities.
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
import { actions, campaigns, items, locations, locationsItems, locationsMonsters } from '@/app/lib/placeholder-data';

import
{
  campaignsDbConnected,
  locationsDbConnected,
  monstersDbConnected,
  actionsDbConnected,
  itemsDbConnected,
  locationsMonstersDbConnected,
  locationsItemsDbConnected,
} from '@/app/lib/db-conn-status';

/****************************************************************************************


Campaigns


*****************************************************************************************/

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for creating a new campaign.
export async function createCampaign(prevState: CampaignFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const campaign: Campaign =
  {
    title: validateFields.data.title,
    start_date: validateFields.data.start_date,
    end_date: validateFields.data.end_date,
    dungeon_master: validateFields.data.dungeon_master
  };

  campaigns.push(campaign);
  console.log(JSON.stringify(campaigns));

  if (campaignsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we added a new campaign, we want to force the campaigns page to update
  // its state to display it.
  revalidatePath('/campaigns');

  // Send user back to campaigns page.
  redirect('/campaigns');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for updating an existing campaign.
export async function updateCampaignById(id: number, prevState: CampaignFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
  const validateFields = UpdateCampaign.safeParse({
    title: formData.get('title'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date'),
    dungeon_master: formData.get('dungeon_master'),
  });

  console.info(formData);

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Campaign',
    };
  }

  // Convert form values into a valid type before sending to backend.
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

  if (campaignsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we updated an existing campaign, we want to force the campaigns page to update
  // its state to display it.
  revalidatePath('/campaigns');

  // Send user back to campaigns page.
  redirect('/campaigns');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when deleting an existing campaign.
export async function deleteCampaignById(id: number)
{
  campaigns.splice(id - 1, 1);
  console.log(JSON.stringify(campaigns));

  if (campaignsDbConnected)
  {
    let connection: PoolConnection | null = null;

    // Attempt to delete campaign from backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we deleted an existing campaign, we want to force the campaigns page to update
  // its state to display it.
  revalidatePath('/campaigns');

  // Send user back to campaigns page.
  redirect('/campaigns');
}

/****************************************************************************************


Locations


*****************************************************************************************/

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for creating a new location.
export async function createLocation(prevState: LocationFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const location: Location =
  {
    campaign_name: validateFields.data.campaign_name,
    location_name: validateFields.data.location_name,
    location_description: validateFields.data.location_description,
  };

  locations.push(location);
  console.log(JSON.stringify(locations));

  if (locationsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we added a new location, we want to force the locations page to update
  // its state to display it.
  revalidatePath('/locations');

  // Send user back to locations page.
  redirect('/locations');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for updating an existing location.
export async function updateLocationById(id: number, prevState: LocationFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const location: Location =
  {
    location_id: id,
    campaign_name: validateFields.data.campaign_name,
    location_name: validateFields.data.location_name,
    location_description: validateFields.data.location_description,
  };

  locations[id - 1] = location;
  console.log(JSON.stringify(locations));

  if (locationsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we updated an existing location, we want to force the locations page to update
  // its state to display it.
  revalidatePath('/locations');

  // Send user back to locations page.
  redirect('/locations');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when deleting an existing location.
export async function deleteLocationById(id: number)
{
  campaigns.splice(id - 1, 1);
  console.log(JSON.stringify(campaigns));

  if (locationsDbConnected)
  {
    let connection: PoolConnection | null = null;

    // Attempt to delete campaign from backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we deleted an existing location, we want to force the locations page to update
  // its state to display it.
  revalidatePath('/locations');

  // Send user back to locations page.
  redirect('/locations');
}

/****************************************************************************************


Monsters


*****************************************************************************************/

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for creating a new monster.
export async function createMonster(prevState: MonsterFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const monster: Monster =
  {
    monster_name: validateFields.data.monster_name,
    armor_class: validateFields.data.armor_class,
    hit_points: validateFields.data.hit_points,
    monster_type: validateFields.data.monster_type
  };

  if (monstersDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we added a new monster, we want to force the monsters page to update
  // its state to display it.
  revalidatePath('/monsters');

  // Send user back to monsters page.
  redirect('/monsters');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for updating an existing monster.
export async function updateMonsterById(id: number, prevState: MonsterFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const monster: Monster =
  {
    monster_id: id,
    monster_name: validateFields.data.monster_name,
    armor_class: validateFields.data.armor_class,
    hit_points: validateFields.data.hit_points,
    monster_type: validateFields.data.monster_type
  };

  if (monstersDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we updated an existing monster, we want to force the monsters page to update
  // its state to display it.
  revalidatePath('/monsters');

  // Send user back to monsters page.
  redirect('/monsters');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when deleting an existing monster.
export async function deleteMonsterById(id: number)
{
  if (monstersDbConnected)
  {
    let connection: PoolConnection | null = null;

    // Attempt to delete monster from backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we deleted an existing monster, we want to force the monsters page to update
  // its state to display it.
  revalidatePath('/monsters');

  // Send user back to monsters page.
  redirect('/monsters');
}

/****************************************************************************************


Actions


*****************************************************************************************/

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for creating a new action.
export async function createAction(prevState: ActionFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const action: Action =
  {
    action_name: validateFields.data.action_name,
    monster_name: validateFields.data.monster_name,
    action_description: validateFields.data.description,
  };

  actions.push(action);
  console.log(JSON.stringify(actions));

  if (actionsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we added a new action, we want to force the actions page to update
  // its state to display it.
  revalidatePath('/actions');

  // Send user back to actions page.
  redirect('/actions');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for updating an existing action.
export async function updateActionById(id: number, prevState: ActionFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const action: Action =
  {
    action_id: id,
    action_name: validateFields.data.action_name,
    monster_name: validateFields.data.monster_name,
    action_description: validateFields.data.description,
  };

  actions[id - 1] = action;
  console.log(JSON.stringify(actions));

  if (actionsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we updated an existing action, we want to force the actions page to update
  // its state to display it.
  revalidatePath('/actions');

  // Send user back to actions page.
  redirect('/actions');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when deleting an existing action.
export async function deleteActionById(id: number)
{
  actions.splice(id - 1, 1);
  console.log(JSON.stringify(actions));

  if (actionsDbConnected)
  {
    let connection: PoolConnection | null = null;

    // Attempt to delete campaign from backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we deleted an existing action, we want to force the actions page to update
  // its state to display it.
  revalidatePath('/actions');

  // Send user back to actions page.
  redirect('/actions');
}

/****************************************************************************************


Items


*****************************************************************************************/

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for creating a new item.
export async function createItem(prevState: ItemFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const item: Item =
  {
    item_name: validateFields.data.item_name,
    value: validateFields.data.value,
    weight: validateFields.data.weight,
  };

  items.push(item);
  console.log(JSON.stringify(items));

  if (itemsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we added a new item, we want to force the items page to update
  // its state to display it.
  revalidatePath('/items');

  // Send user back to items page.
  redirect('/items');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for updating an existing item.
export async function updateItemById(id: number, prevState: ItemFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const item: Item =
  {
    item_id: id,
    item_name: validateFields.data.item_name,
    value: validateFields.data.value,
    weight: validateFields.data.weight,
  };

  items[id - 1] = item;
  console.log(JSON.stringify(items));

  if (itemsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we updated an existing item, we want to force the items page to update
  // its state to display it.
  revalidatePath('/items');

  // Send user back to items page.
  redirect('/items');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when deleting an existing item.
export async function deleteItemById(id: number)
{
  items.splice(id - 1, 1);
  console.log(JSON.stringify(items));

  if (itemsDbConnected)
  {
    let connection: PoolConnection | null = null;

    // Attempt to delete item from backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we deleted an existing item, we want to force the items page to update
  // its state to display it.
  revalidatePath('/items');

  // Send user back to items page.
  redirect('/items');
}

/****************************************************************************************


Locations_Monsters


*****************************************************************************************/

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for creating a new item.
export async function createLocationMonster(prevState: LocationMonsterFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const locationMonster: LocationMonster =
  {
    location_name: validateFields.data.location_name,
    monster_name: validateFields.data.monster_name,
  };

  locationsMonsters.push(locationMonster);
  console.log(JSON.stringify(locationsMonsters));

  if (locationsMonstersDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we added a new item, we want to force the items page to update
  // its state to display it.
  revalidatePath('/locations-monsters');

  // Send user back to items page.
  redirect('/locations-monsters');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for updating an existing item.
export async function updateLocationMonsterById(id: number, prevState: LocationMonsterFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const locationMonster: LocationMonster =
  {
    location_monster_id: id,
    location_name: validateFields.data.location_name,
    monster_name: validateFields.data.monster_name,
  };

  locationsMonsters[id - 1] = locationMonster;
  console.log(JSON.stringify(locationsMonsters));

  if (locationsMonstersDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we updated an existing item, we want to force the items page to update
  // its state to display it.
  revalidatePath('/locations-monsters');

  // Send user back to items page.
  redirect('/locations-monsters');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when deleting an existing item.
export async function deleteLocationMonsterById(id: number)
{
  items.splice(id - 1, 1);
  console.log(JSON.stringify(items));

  if (locationsMonstersDbConnected)
  {
    let connection: PoolConnection | null = null;

    // Attempt to delete item from backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we deleted an existing item, we want to force the items page to update
  // its state to display it.
  revalidatePath('/locations-monsters');

  // Send user back to items page.
  redirect('/locations-monsters');
}

/****************************************************************************************


Locations_Items


*****************************************************************************************/

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for creating a new item.
export async function createLocationItem(prevState: LocationItemFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const locationItem: LocationItem =
  {
    location_name: validateFields.data.location_name,
    item_name: validateFields.data.item_name,
  };

  locationsItems.push(locationItem);
  console.log(JSON.stringify(locationsItems));

  if (locationsItemsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we added a new item, we want to force the items page to update
  // its state to display it.
  revalidatePath('/locations-items');

  // Send user back to items page.
  redirect('/locations-items');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for updating an existing item.
export async function updateLocationItemById(id: number, prevState: LocationItemFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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

  // Convert form values into a valid type before sending to backend.
  const locationItem: LocationItem =
  {
    location_item_id: id,
    location_name: validateFields.data.location_name,
    item_name: validateFields.data.item_name,
  };

  locationsItems[id - 1] = locationItem;
  console.log(JSON.stringify(locationsItems));

  if (locationsItemsDbConnected)
  {
    // Attempt to send form data to backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we updated an existing item, we want to force the items page to update
  // its state to display it.
  revalidatePath('/locations-items');

  // Send user back to items page.
  redirect('/locations-items');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when deleting an existing item.
export async function deleteLocationItemById(id: number)
{
  items.splice(id - 1, 1);
  console.log(JSON.stringify(items));

  if (locationsItemsDbConnected)
  {
    let connection: PoolConnection | null = null;

    // Attempt to delete item from backend.
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
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }
    }
  }

  // Since we deleted an existing item, we want to force the items page to update
  // its state to display it.
  revalidatePath('/locations-items');

  // Send user back to items page.
  redirect('/locations-items');
}