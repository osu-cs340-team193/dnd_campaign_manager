import { PoolConnection } from 'mysql2/promise';

import mysql from '@/app/lib/db';

import { monsters } from '@/app/lib/placeholder-data.js';
import { MonstersEntity } from '@/app/lib/monsters-entity';
import { 
  EntityAttributeValuePair, 
  EntityAttributeFilter, 
} from '@/app/lib/entity';

import {
  greaterThan, 
  lessThanEqual, 
  equalTo 
} from '@/app/lib/query';

async function testQueries(connection: PoolConnection)
{
  const hpFilter: EntityAttributeFilter = 
  {
    attr: MonstersEntity.hit_points,
    op: greaterThan,
    value: 10,
  };

  const acFilter: EntityAttributeFilter =
  {
    attr: MonstersEntity.armor_class,
    op: lessThanEqual,
    value: 13,
  };

  let result = await MonstersEntity.selectAll(connection, [hpFilter, acFilter], false, 2);
  console.log(result);

  result = await MonstersEntity.select(connection, [MonstersEntity.monster_name, MonstersEntity.id]);
  console.log(result);

  const idFilter: EntityAttributeFilter =
  {
    attr: MonstersEntity.id,
    op: equalTo,
    value: 1
  };

  MonstersEntity.update(connection, [MonstersEntity.monster_name], ['New Name'] , [idFilter]);

  result = await MonstersEntity.selectAll(connection);
  console.log(result);

  MonstersEntity.delete(connection, [idFilter]);

  result = await MonstersEntity.selectAll(connection);
  console.log(result);
}

async function main()
{
  // Acquire a connection to database.
  const connection: PoolConnection = await mysql.createConnection();

  // Even if we aren't storing results, calling await is necessary to guarantee ordered queries.
  await MonstersEntity.dropTable(connection);
  await MonstersEntity.createTable(connection);
  await MonstersEntity.insertMany(connection, monsters);

  //await testQueries(connection);

  // Release connection to database.
  mysql.releaseConnection(connection);

  // Close database connection. Not doing this will make the program hang after 
  // executing all queries.
  mysql.closeConnection();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});