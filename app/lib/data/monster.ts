import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

import { FieldPacket, PoolConnection } from 'mysql2/promise';

import { Monster, MonstersEntity, IMonster, IMonsterType } from '@/app/lib/entities/monsters-entity';

import 
{ 
  EntityAttributeFilter, 
} from '@/app/lib/entities/entity';

import 
{
  equalTo 
} from '@/app/lib/database/query';

import mysql from '@/app/lib/database/db';

export async function fetchMonsters() : Promise<Monster[]>
{
  // Don't cache db queries.
  // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
  noStore();

  // Attempt to get monsters from backend.
  let connection: PoolConnection | null = null;
  try 
  {
    connection = await mysql.createConnection();
    const data = await MonstersEntity.selectAll(connection);

    return data;
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
  }
}

export async function fetchMonsterById(id: number) : Promise<Monster>
{
  // Don't cache db queries.
  // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
  noStore();

  const idFilter: EntityAttributeFilter =
  {
    attr: MonstersEntity.monster_id,
    op: equalTo,
    value: id 
  };

  let data: IMonster[] | null = null;

  // Attempt to get monster from backend.
  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    data = await MonstersEntity.selectAll(connection, [idFilter]);
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
    if (data?.length == 0)
    {
      notFound();
    }
  }

  return data[0];
}

export async function fetchMonsterTypes() : Promise<IMonsterType[]>
{
  noStore();

  let data: IMonsterType[] | null = null;

  // Attempt to get monster types from backend.
  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    data = (await connection.execute<IMonsterType[] & FieldPacket[]>('SELECT DISTINCT `monster_type` FROM `Monsters` ORDER BY `monster_type` ASC'))[0];
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