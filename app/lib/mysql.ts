import
{
  createPool,
  PoolOptions,
  Pool,
  PoolConnection,
} from 'mysql2/promise';

// Handles sql connection to database

// Citation for the following class:
// Date: 02/18/2024
// Title: Adapted from [MySQL2: Basic Custom Class]
// Type: Source Code
// Author: Andrey Sidorov
// Code Version: N/A
// Source URL: https://sidorares.github.io/node-mysql2/docs/examples/typescript/basic-custom-class
// Description: Class structure and methods borrowed from source.
export class MySQLConnection
{
  private pool: Pool;
  private credentials: PoolOptions;

  // Create connection pool using provided database credentials.
  constructor(credentials: PoolOptions)
  {
    this.credentials = credentials;
    this.pool = createPool(this.credentials);
  }

  // Test if pool initialized before making queries, and initialize if not.
  private ensureConnection()
  {
    if (!this?.pool)
    {
      console.log('Pool not initialized. Initializing again...');

      this.pool = createPool(this.credentials);
    }
  }

  // 1. Get new connection from pool. Must be followed by a releaseConnection call 
  // to free up connection for others to use.
  // 2. The pool.query automatically releases the connection when finished, so this
  // is more for making a connection for multiple queries that need to run sequentially.
  async createConnection()
  {
    this.ensureConnection();

    return await this.pool.getConnection(); 
  }

  // A connection must be released manually back into the pool after its no longer in use
  releaseConnection(connection: PoolConnection)
  {
    if (connection)
    {
      this.pool?.releaseConnection(connection);
      connection.release();
    }
  }

  // Close connection to database
  closeConnection()
  {
    this.pool?.end();
  }
}