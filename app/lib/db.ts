import { PoolOptions } from 'mysql2';
import { MySQLConnection } from '@/app/lib/mysql';

// Database connection configuration
const access: PoolOptions = {
  host: process.env.MYSQL_HOST, 
  port: parseInt(process.env.MYSQL_PORT ?? "3306"),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
};

// Establish initial connection with database.
const mysql: MySQLConnection = new MySQLConnection(access);

export default mysql;