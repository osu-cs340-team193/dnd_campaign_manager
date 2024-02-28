import { unstable_noStore as noStore } from 'next/cache';
import { PoolConnection } from 'mysql2/promise';

import { notFound, redirect } from 'next/navigation';

import mysql from '@/app/lib/db';
import Query from '@/app/lib/query';
import
{
  Monster,
  IMonster,
  IMonsterType,
  Campaign,
  DungeonMaster,
  MonsterType,
  Location,
  ILocation,
  ICampaign,
  IDungeonMaster,
  Action,
  IAction,
  Item,
  IItem,
  LocationName,
  ILocationName,
  MonsterName,
  IMonsterName,
  CampaignTitle,
  ICampaignTitle,
  IItemName,
  ItemName,
  LocationMonster,
  ILocationMonster,
  LocationItem,
  ILocationItem,
} from '@/app/lib/definitions';

import 
{ 
  actions,
  campaignTitles,
  campaigns, 
  dungeonMasters, 
  itemNames, 
  items, 
  locationItemNames, 
  locationMonsterNames, 
  locationNames, 
  locations, 
  locationsItems, 
  locationsMonsters, 
  monsterNames, 
  monsterTypes, 
  monsters,
  itemLocationNames,
} from '@/app/lib/placeholder-data';

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
export async function fetchCampaigns() : Promise<Campaign[]>
{
  if (campaignsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    // Attempt to get monsters from backend.
    let connection: PoolConnection | null = null;
    let data: ICampaign[] | null = null;
    try 
    {
      connection = await mysql.createConnection();
      data = await Query.getAllCampaigns(connection);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch campaigns.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        redirect('/500');
      }
    }

    return data;
  }
  else
  {
    return campaigns;
  }
}

export async function fetchCampaignById(id: number) : Promise<Campaign>
{
  if (campaignsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: ICampaign | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getCampaignById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch campaign.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return campaigns[id - 1];
  }
}

export async function fetchCampaignTitles() : Promise<CampaignTitle[]>
{
  if (campaignsDbConnected)
  {
    noStore();

    let data: ICampaignTitle[] | null = null;

    // Attempt to get dungeon masters from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getAllCampaignTitles(connection);
    }
    catch (err)
    {
      throw new Error('Failed to fetch campaign titles');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data?.length == 0)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return campaignTitles;
  }
}

export async function fetchDungeonMasters() : Promise<DungeonMaster[]>
{
  if (campaignsDbConnected)
  {
    noStore();

    let data: IDungeonMaster[] | null = null;

    // Attempt to get dungeon masters from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getAllDungeonMasters(connection);
    }
    catch (err)
    {
      throw new Error('Failed to fetch dungeon masters');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data?.length == 0)
      {
        notFound();
      }
    }

    return data;
  }
  else 
  {
    return dungeonMasters;
  }
}

/****************************************************************************************


Locations


*****************************************************************************************/
export async function fetchLocations() : Promise<Location[]>
{
  if (locationsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    // Attempt to get monsters from backend.
    let connection: PoolConnection | null = null;
    let data: ILocation[] | null = null;
    try 
    {
      connection = await mysql.createConnection();
      data = await Query.getAllLocations(connection);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch locations.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        redirect('/500');
      }
    }

    return data;
  }
  else
  {
    return locations;
  }
}

export async function fetchLocationById(id: number) : Promise<Location>
{
  if (locationsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: ILocation | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getLocationById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch location.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return locations[id - 1];
  }
}

export async function fetchLocationNames() : Promise<LocationName[]>
{
  if (locationsDbConnected)
  {
    noStore();

    let data: ILocationName[] | null = null;

    // Attempt to get dungeon masters from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getAllLocationNames(connection);
    }
    catch (err)
    {
      throw new Error('Failed to fetch location names');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data?.length == 0)
      {
        notFound();
      }
    }

    return data;
  }
  else 
  {
    return locationNames;
  }
}

export async function fetchLocationMonsterNamesById(id: number) : Promise<MonsterName[]>
{
  if (locationsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: IMonsterName[] | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getAllLocationMonsterNamesById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch location monster.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return locationMonsterNames[id - 1];
  }
}

export async function fetchLocationItemNamesById(id: number) : Promise<ItemName[]>
{
  if (locationsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: IItemName[] | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getAllLocationItemNamesById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch location monster.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return locationItemNames[id - 1];
  }
}

/****************************************************************************************


Monsters


*****************************************************************************************/
export async function fetchMonsters() : Promise<Monster[]>
{
  if (monstersDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    // Attempt to get monsters from backend.
    let connection: PoolConnection | null = null;
    let data: Monster[] | null = null;
    try 
    {
      connection = await mysql.createConnection();
      data = await Query.getAllMonsters(connection);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all monsters');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        redirect('/500');
      }
    }

    return data;
  }
  else
  {
    return monsters;
  }
}

export async function fetchMonsterById(id: number) : Promise<Monster>
{
  if (monstersDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: IMonster | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getMonsterById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      //return { message: 'Database Error: Failed to Fetch Monster' }
      throw new Error('Failed to fetch monster.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else 
  {
    return monsters[id - 1];
  }
}

export async function fetchMonsterNames() : Promise<MonsterName[]>
{
  if (monstersDbConnected)
  {
    noStore();

    let data: IMonsterName[] | null = null;

    // Attempt to get monster types from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getAllMonsterNames(connection);
    }
    catch (err)
    {
      throw new Error('Failed to fetch monster names');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data?.length == 0)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return monsterNames;
  }
}

export async function fetchMonsterTypes() : Promise<MonsterType[]>
{
  if (monstersDbConnected)
  {
    noStore();

    let data: IMonsterType[] | null = null;

    // Attempt to get monster types from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getAllMonsterTypes(connection);
    }
    catch (err)
    {
      throw new Error('Failed to fetch monster types');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data?.length == 0)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return monsterTypes;
  }
}

/****************************************************************************************


Actions


*****************************************************************************************/
export async function fetchActions() : Promise<Action[]>
{
  if (actionsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    // Attempt to get monsters from backend.
    let connection: PoolConnection | null = null;
    let data: IAction[] | null = null;
    try 
    {
      connection = await mysql.createConnection();
      data = await Query.getAllActions(connection);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch actions.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        redirect('/500');
      }
    }

    return data;
  }
  else
  {
    return actions;
  }
}

export async function fetchActionById(id: number) : Promise<Action>
{
  if (actionsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: IAction | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getActionById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch action.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return actions[id - 1];
  }
}

/****************************************************************************************


Items


*****************************************************************************************/
export async function fetchItems() : Promise<Item[]>
{
  if (itemsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    // Attempt to get monsters from backend.
    let connection: PoolConnection | null = null;
    let data: IItem[] | null = null;
    try 
    {
      connection = await mysql.createConnection();
      data = await Query.getAllItems(connection);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch items.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        redirect('/500');
      }
    }

    return data;
  }
  else
  {
    return items;
  }
}

export async function fetchItemById(id: number) : Promise<Item>
{
  if (itemsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: IItem | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getItemById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch item.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return items[id - 1];
  }
}

export async function fetchItemNames() : Promise<ItemName[]>
{
  if (itemsDbConnected)
  {
    noStore();

    let data: IItemName[] | null = null;

    // Attempt to get monster types from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getAllItemNames(connection);
    }
    catch (err)
    {
      throw new Error('Failed to fetch item names');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data?.length == 0)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return itemNames;
  }
}

export async function fetchItemLocationNamesById(id: number) : Promise<LocationName[]>
{
  if (itemsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: ILocationName[] | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getAllItemLocationNamesById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch item locations.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return itemLocationNames[id - 1];
  }
}

/****************************************************************************************


Locations_Monsters


*****************************************************************************************/
export async function fetchLocationsMonsters() : Promise<LocationMonster[]>
{
  if (locationsMonstersDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    // Attempt to get monsters from backend.
    let connection: PoolConnection | null = null;
    let data: ILocationMonster[] | null = null;
    try 
    {
      connection = await mysql.createConnection();
      data = await Query.getAllLocationsMonsters(connection);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch locations monsters.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        redirect('/500');
      }
    }

    return data;
  }
  else
  {
    return locationsMonsters;
  }
}

export async function fetchLocationMonsterById(id: number) : Promise<LocationMonster>
{
  if (locationsMonstersDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: ILocationMonster | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getLocationMonsterById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch location monster.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return locationsMonsters[id - 1];
  }
}

/****************************************************************************************


Locations_Items


*****************************************************************************************/
export async function fetchLocationsItems() : Promise<LocationItem[]>
{
  if (locationsItemsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    // Attempt to get monsters from backend.
    let connection: PoolConnection | null = null;
    let data: ILocationItem[] | null = null;
    try 
    {
      connection = await mysql.createConnection();
      data = await Query.getAllLocationsItems(connection);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch locations items.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        redirect('/500');
      }
    }

    return data;
  }
  else
  {
    return locationsItems;
  }
}

export async function fetchLocationItemById(id: number) : Promise<LocationItem>
{
  if (locationsItemsDbConnected)
  {
    // Don't cache db queries.
    // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
    noStore();

    let data: ILocationItem | null = null;

    // Attempt to get monster from backend.
    let connection: PoolConnection | null = null;
    try
    {
      connection = await mysql.createConnection();
      data = await Query.getLocationItemById(connection, id);
    }
    catch (err)
    {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch location item.');
    }
    finally
    {
      // Always release connection at end of transaction.
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query.
      // Reroute outside of try-catch so we don't trigger catch block again.
      if (data == null)
      {
        notFound();
      }
    }

    return data;
  }
  else
  {
    return locationsItems[id - 1];
  }
}