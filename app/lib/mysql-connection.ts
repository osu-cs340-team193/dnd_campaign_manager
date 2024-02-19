// Code borrowed from: https://sidorares.github.io/node-mysql2/docs/examples/typescript/basic-custom-class
import
{
  createPool,
  PoolOptions,
  Pool,
  PoolConnection,
} from 'mysql2/promise';

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
      this.pool = createPool(this.credentials);
    }
  }

  // 1. Get new connection from pool. Must be followed by a releaseConnection call 
  // to free up connection for others to use.
  // 2. The pool.query automatically releases the connection when finished, so this
  // is more for making a connection for multiple queries that need to run sequentially.
  // See: https://stackoverflow.com/a/57121491
  async createConnection()
  {
    this.ensureConnection();

    return await this.pool.getConnection(); 
  }

  releaseConnection(connection: PoolConnection)
  {
    // The mysql docs say to call both, but I'm not sure if it's saying
    // you have to choose one option or do both in the exact same order.
    // See: https://sidorares.github.io/node-mysql2/docs/examples/connections/create-pool
    if (connection)
    {
      this.pool?.releaseConnection(connection);
      connection.release();
    }
  }

  // Close connection to database.
  closeConnection()
  {
    this.pool?.end();
  }
}