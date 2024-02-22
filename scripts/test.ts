import { PoolConnection } from 'mysql2/promise';

// App's database connection state.
import mysql from '@/app/lib/db';

// Import helper classes for performing CRUD on database entities.
import { MonstersEntity } from '@/app/lib/monsters-entity';

// Helper definitions/types for dynamically creating queries.
import { EntityAttributeFilter } from '@/app/lib/entity';

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