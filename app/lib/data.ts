import { unstable_noStore as noStore } from 'next/cache';
import { PoolConnection } from 'mysql2/promise';
import 
{ 
  notFound, 
  redirect 
} from 'next/navigation';
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
  ActionName,
  IActionName,
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
  monsterLocationNames,
  monsterActionNames,
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


// Data fetching handlers

// Citation for the following functions:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Fetching Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/fetching-data
// Description: General function structure adapted from source.

/****************************************************************************************


Campaigns


*****************************************************************************************/
// GET /campaigns
export async function fetchCampaigns() : Promise<Campaign[]>
{
  if (campaignsDbConnected)
  {
    // Don't cache db queries
    noStore();

    // Attempt to get data from backend
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
      // Always release connection at end of transaction
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      // No results found from query
      // Reroute outside of try-catch so we don't trigger catch block again
      if (data == null)
      {
        redirect('/pages/500');
      }
    }

    return data;
  }
  else
  {
    return campaigns;
  }
}

// GET /campaigns/{id}
export async function fetchCampaignById(id: number) : Promise<Campaign>
{
  if (campaignsDbConnected)
  {
    noStore();

    let data: ICampaign | null = null;
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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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

// GET /campaigns/titles
export async function fetchCampaignTitles() : Promise<CampaignTitle[]>
{
  if (campaignsDbConnected)
  {
    noStore();

    let data: ICampaignTitle[] | null = null;
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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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

// GET /campaigns/dungeon-masters
export async function fetchDungeonMasters() : Promise<DungeonMaster[]>
{
  if (campaignsDbConnected)
  {
    noStore();

    let data: IDungeonMaster[] | null = null;

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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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
// GET /locations
export async function fetchLocations() : Promise<Location[]>
{
  if (locationsDbConnected)
  {
    noStore();

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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      if (data == null)
      {
        redirect('/pages/500');
      }
    }

    return data;
  }
  else
  {
    return locations;
  }
}

// GET /locations/{id}
export async function fetchLocationById(id: number) : Promise<Location>
{
  
  if (locationsDbConnected)
  {
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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      if (data == null)
      {
        notFound();
      }
    }

    console.log("Id shows as " + JSON.stringify(data))

    return data;
  }
  else
  {
    return locations[id - 1];
  }
}

// GET /locations/names
export async function fetchLocationNames() : Promise<LocationName[]>
{
  if (locationsDbConnected)
  {
    noStore();

    let data: ILocationName[] | null = null;
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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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

// GET /locations/{id}/monster-names
export async function fetchLocationMonsterNamesById(id: number) : Promise<MonsterName[]>
{
  if (locationsDbConnected)
  {
    noStore();

    let data: IMonsterName[] | null = null;
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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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

// GET /locations/{id}/item-names
export async function fetchLocationItemNamesById(id: number) : Promise<ItemName[]>
{
  if (locationsDbConnected)
  {
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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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
// GET /monsters
export async function fetchMonsters() : Promise<Monster[]>
{
  noStore();

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
    if (connection)
    {
      mysql.releaseConnection(connection);
    }

    if (data == null)
    {
      redirect('/pages/500');
    }
  }

  return data;
}

// GET /monsters/{id}
export async function fetchMonsterById(id: number) : Promise<Monster>
{
  noStore();

  let data: IMonster | null = null;
  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    data = await Query.getMonsterById(connection, id);
  }
  catch (err)
  {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch monster.');
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }

    if (data == null)
    {
      notFound();
    }
  }

  return data;
}

// GET /monsters/names
export async function fetchMonsterNames() : Promise<MonsterName[]>
{
  noStore();

  let data: IMonsterName[] | null = null;
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
    if (connection)
    {
      mysql.releaseConnection(connection);
    }

    if (data?.length == 0)
    {
      notFound();
    }
  }

  return data;
}

// GET /monsters/types
export async function fetchMonsterTypes() : Promise<MonsterType[]>
{
  noStore();

  let data: IMonsterType[] | null = null;
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
    if (connection)
    {
      mysql.releaseConnection(connection);
    }

    if (data?.length == 0)
    {
      notFound();
    }
  }

  return data;
}

// GET /monsters/{id}/location-names
export async function fetchMonsterLocationNamesById(id: number) : Promise<LocationName[]>
{
  noStore();

  let data: ILocationName[] | null = null;
  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    data = await Query.getAllMonsterLocationNamesById(connection, id);
  }
  catch (err)
  {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch monster locations.');
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }

    if (data == null)
    {
      notFound();
    }
  }

  return data;
}

// GET /monsters/{id}/action-names
export async function fetchMonsterActionNamesById(id: number) : Promise<ActionName[]>
{
  noStore();

  let data: IActionName[] | null = null;
  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    data = await Query.getAllMonsterActionNamesById(connection, id);
  }
  catch (err)
  {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch monster actions.');
  }
  finally
  {
    if (connection)
    {
      mysql.releaseConnection(connection);
    }

    if (data == null)
    {
      notFound();
    }
  }

  return data;
}

/****************************************************************************************


Actions


*****************************************************************************************/
// GET /actions
export async function fetchActions() : Promise<Action[]>
{
  noStore();

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
    if (connection)
    {
      mysql.releaseConnection(connection);
    }

    if (data == null)
    {
      redirect('/pages/500');
    }
  }

  return data;
}

// GET /actions/{id}
export async function fetchActionById(id: number) : Promise<Action>
{
  noStore();

  let data: IAction | null = null;
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
    if (connection)
    {
      mysql.releaseConnection(connection);
    }

    if (data == null)
    {
      notFound();
    }
  }

  return data;
}

/****************************************************************************************


Items


*****************************************************************************************/
// GET /items
export async function fetchItems() : Promise<Item[]>
{
  if (itemsDbConnected)
  {
    noStore();

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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      if (data == null)
      {
        redirect('/pages/500');
      }
    }

    return data;
  }
  else
  {
    return items;
  }
}

// GET /items/{id}
export async function fetchItemById(id: number) : Promise<Item>
{
  if (itemsDbConnected)
  {
    noStore();

    let data: IItem | null = null;
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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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

// GET /items/names
export async function fetchItemNames() : Promise<ItemName[]>
{
  if (itemsDbConnected)
  {
    noStore();

    let data: IItemName[] | null = null;
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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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

// GET /items/{id}/location-names
export async function fetchItemLocationNamesById(id: number) : Promise<LocationName[]>
{
  if (itemsDbConnected)
  {
    noStore();

    let data: ILocationName[] | null = null;
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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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
// GET /locations-monsters
export async function fetchLocationsMonsters() : Promise<LocationMonster[]>
{
  if (locationsMonstersDbConnected)
  {
    noStore();

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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      if (data == null)
      {
        redirect('/pages/500');
      }
    }

    return data;
  }
  else
  {
    return locationsMonsters;
  }
}

// GET locations-monsters/{id}
export async function fetchLocationMonsterById(id: number) : Promise<LocationMonster>
{
  if (locationsMonstersDbConnected)
  {
    noStore();

    let data: ILocationMonster | null = null;

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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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
// GET /locations-items
export async function fetchLocationsItems() : Promise<LocationItem[]>
{
  if (locationsItemsDbConnected)
  {
    noStore();

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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

      if (data == null)
      {
        redirect('/pages/500');
      }
    }

    return data;
  }
  else
  {
    return locationsItems;
  }
}

// GET /locations-items/{id}
export async function fetchLocationItemById(id: number) : Promise<LocationItem>
{
  if (locationsItemsDbConnected)
  {
    noStore();

    let data: ILocationItem | null = null;

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
      if (connection)
      {
        mysql.releaseConnection(connection);
      }

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