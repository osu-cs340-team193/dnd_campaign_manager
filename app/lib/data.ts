import { FieldPacket, PoolConnection } from 'mysql2/promise';

import { unstable_noStore as noStore } from 'next/cache';

import { Monster, MonstersEntity, IMonster, IMonsterType } from '@/app/lib/monsters-entity';

import { 
  EntityAttributeFilter, 
} from '@/app/lib/entity';

import {
  equalTo 
} from '@/app/lib/query';

import mysql from '@/app/lib/db';
import { notFound } from 'next/navigation';

export async function fetchMonsters() : Promise<Monster[]>
{
  // Don't cache db queries.
  // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
  noStore();

  try 
  {
    const connection: PoolConnection = await mysql.createConnection();

    const data = await MonstersEntity.selectAll(connection);

    mysql.releaseConnection(connection);

    return data;
  }
  catch (err)
  {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all monsters");
  }
}

export async function fetchMonsterById(id: number) : Promise<Monster>
{
  noStore();

  const idFilter: EntityAttributeFilter =
  {
    attr: MonstersEntity.id,
    op: equalTo,
    value: id 
  };

  let data: IMonster[] | null = null;

  try
  {
    const connection: PoolConnection = await mysql.createConnection();

    data = await MonstersEntity.selectAll(connection, [idFilter]);

    mysql.releaseConnection(connection);
  }
  catch (err)
  {
    console.error("Database Error:", err);
    //return { message: 'Database Error: Failed to Fetch Monster' }
    throw new Error("Failed to fetch monster.");
  }

  // No results found from query.
  // Reroute outside of try-catch so we don't trigger catch block again.
  if (data?.length == 0)
  {
    notFound();
  }

  return data[0];
}

export async function fetchMonsterTypes() : Promise<IMonsterType[]>
{
  noStore();

  let data: IMonsterType[];

  try
  {
    const connection: PoolConnection = await mysql.createConnection();

    data = (await connection.execute<IMonsterType[] & FieldPacket[]>('SELECT DISTINCT `monster_type` FROM `monsters` ORDER BY `monster_type` ASC'))[0];

    mysql.releaseConnection(connection);
  }
  catch (err)
  {
    throw new Error('Failed to fetch monster types');
  }

  if (data?.length == 0)
  {
    notFound();
  }

  return data;
}