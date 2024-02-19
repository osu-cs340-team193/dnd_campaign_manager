import { PoolConnection } from 'mysql2/promise';

import mysql from '@/app/lib/db';

import { monsters } from '@/app/lib/placeholder-data.js';
import { MonstersEntity } from '@/app/lib/monsters-entity';

async function main()
{
  // Acquire a connection to database.
  const connection: PoolConnection = await mysql.createConnection();

  MonstersEntity.dropTable(connection);
  MonstersEntity.createTable(connection);
  MonstersEntity.insertMany(connection, monsters);

  // Release connection to database.
  mysql.releaseConnection(connection);

  // Close database connection. Not doing this will make the program hang after 
  // executing all queries.
  mysql.closeConnection();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});