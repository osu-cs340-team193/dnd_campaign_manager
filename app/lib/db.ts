// For reading ssl cert.
import fs from 'fs';
import * as dotenv from 'dotenv';
import { PoolOptions } from 'mysql2';
import { MySQLConnection } from '@/app/lib/mysql';

// Read connection secrets from local env file. Must be at root of project directory.
const config = dotenv.config({ path: '@/.env' });

// 1. When seeding the database locally, the connection options need to be
// evaluated using the configparser. 
// 2. The database host says it expects an ssl certificate, but it doesn't seem 
// to be the case. If it is, uncomment the ssl config option below.
const access: PoolOptions = {
  host: config.parsed?.MYSQL_HOST, 
  port: parseInt(config.parsed?.MYSQL_PORT ?? "3306"),
  user: config.parsed?.MYSQL_USER,
  password: config.parsed?.MYSQL_PASSWORD,
  database: config.parsed?.MYSQL_DATABASE,
  connectionLimit: 10,
  //ssl: {
  //  rejectUnauthorized: true,
  //  ca: fs.readFileSync("./ca.pem").toString(),
  //},
};

// Establish initial connection with database.
const mysql: MySQLConnection = new MySQLConnection(access);

export default mysql;