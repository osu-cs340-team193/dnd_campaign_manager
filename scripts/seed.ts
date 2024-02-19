import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import fs from 'fs';

import { monsters } from '../app/lib/placeholder-data.js';

import * as dotenv from 'dotenv';

const config = dotenv.config({ path: '../.env' });

const access: ConnectionOptions = {
  host: config.parsed?.MYSQL_HOST, 
  port: parseInt(config.parsed?.MYSQL_PORT ?? "3306"),
  user: config.parsed?.MYSQL_USER,
  password: config.parsed?.MYSQL_PASSWORD,
  database: config.parsed?.MYSQL_DATABASE,
  //ssl: {
  //  rejectUnauthorized: true,
  //  ca: fs.readFileSync("./ca.pem").toString(),
  //},
  multipleStatements: true,
};

async function seedMonsters(client: Connection)
{
  try
  {
    const createdTable = await client.query(
      `CREATE TABLE IF NOT EXISTS monsters (
        id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
        monster_name varchar(255) NOT NULL,
        armor_class int NOT NULL,
        hit_points int NOT NULL,
        monster_type varchar(255) NOT NULL,
        PRIMARY KEY (id)
      )`
    );

    console.log("Created 'monsters' table");

    const insertedValues = await Promise.all(
      monsters.map(async (monster) => {
        return client.query(
          `INSERT INTO monsters (monster_name, armor_class, hit_points, monster_type)
           VALUES ('${monster.monster_name}', ${monster.armor_class}, ${monster.hit_points}, '${monster.monster_type}')`
        );
      }),
    );

    console.log(`Seeded ${insertedValues.length} monsters`);

    return { createdTable, insertedValues };
  }
  catch (error)
  {
    console.error("Error seeding monsters:", error);
    throw error;
  }
}

async function main()
{
  const client: Connection = await mysql.createConnection(access);
  
  await seedMonsters(client);

  // Close connection and exit.
  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});