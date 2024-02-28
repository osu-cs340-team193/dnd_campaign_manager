import { PoolConnection } from 'mysql2/promise';

// App's database connection state.
import mysql from '@/app/lib/db';

async function testQueries(connection: PoolConnection)
{
}

async function main()
{
  // Acquire a connection to database.
  const connection: PoolConnection = await mysql.createConnection();

  await testQueries(connection);

  // Release connection to database.
  mysql.releaseConnection(connection);

  // Close database connection. Not doing this will make the program hang after 
  // executing all queries.
  mysql.closeConnection();
}

main().catch((err) => {
  console.error('An error occurred during testing.', err);
});