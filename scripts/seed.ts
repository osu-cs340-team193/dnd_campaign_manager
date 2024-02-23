import { PoolConnection } from 'mysql2/promise';

// App's database connection state.
import mysql from '@/app/lib/database/db';

// Import placeholder data to prepopulate databases.
import { monsters } from '@/app/lib/database/placeholder-data.js';

// Import helper classes for performing CRUD on database entities.
import { MonstersEntity } from '@/app/lib/entities/monsters-entity';

async function main()
{
  // Acquire a connection to database.
  const connection: PoolConnection = await mysql.createConnection();

  // Even if we aren't storing results, calling await is necessary to guarantee ordered queries.
  await MonstersEntity.dropTable(connection);
  await MonstersEntity.createTable(connection);
  await MonstersEntity.insertMany(connection, monsters);

  // Release connection to database.
  mysql.releaseConnection(connection);

  // Close database connection. Not doing this will make the program hang after 
  // executing all queries.
  mysql.closeConnection();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});