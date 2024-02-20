import { PoolConnection } from 'mysql2/promise';

import { unstable_noStore as noStore } from 'next/cache';

import { Monster, MonstersEntity } from '@/app/lib/monsters-entity';

import { 
  EntityAttributeFilter, 
} from '@/app/lib/entity';

import {
  equalTo 
} from '@/app/lib/query';

import mysql from '@/app/lib/db';

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

  try
  {
    const connection: PoolConnection = await mysql.createConnection();

    const data = await MonstersEntity.selectAll(connection, [idFilter]);

    mysql.releaseConnection(connection);

    return data[0];
  }
  catch (err)
  {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch monster.");
  }
}