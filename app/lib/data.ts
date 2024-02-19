import mysql, { Connection, PoolOptions, RowDataPacket } from 'mysql2/promise';
import fs from 'fs';

import { unstable_noStore as noStore } from 'next/cache';

import { Monster } from './definitions';

import * as dotenv from 'dotenv';

const config = dotenv.config({ path: '../.env' });

const access: PoolOptions = {
  host: config.parsed?.MYSQL_HOST, 
  port: parseInt(config.parsed?.MYSQL_PORT ?? "3306"),
  user: config.parsed?.MYSQL_USER,
  password: config.parsed?.MYSQL_PASSWORD,
  database: config.parsed?.MYSQL_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
  multipleStatements: true,
  connectionLimit: 10,
};

const client: Connection = mysql.createPool(access);

export async function fetchMonsters() : Promise<Monster[]>
{
  // Don't cache db queries.
  // See: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
  noStore();

  try 
  {
    // See: https://stackoverflow.com/a/70741686
    const [data] = await client.query<Monster[] & RowDataPacket[]>(
      `SELECT * FROM monsters`
    );

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

  try
  {
    const [data] = await client.query<Monster[] & RowDataPacket[]>(
      `SELECT * FROM monsters
       WHERE id = ${id}`
    );

    return data[0];
  }
  catch (err)
  {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch monster.");
  }
}