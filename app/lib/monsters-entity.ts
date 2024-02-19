import { PoolConnection, RowDataPacket } from 'mysql2/promise';

// https://dev.to/larswaechter/using-mysql-in-nodejs-with-typescript-ida
export interface IMonster extends RowDataPacket
{
  id?: number;
  monster_name: string;
  armor_class: number;
  hit_points: number;
  monster_type: string;
}

// Monster type.
export type Monster = {
  id?: number;
  monster_name: string;
  armor_class: number;
  hit_points: number;
  monster_type: string;
};

export class MonstersEntity 
{
  static dropTable(connection: PoolConnection)
  {
    const query: string = `
      DROP TABLE IF EXISTS monsters
    `;

    connection.execute(query);
    console.log('Dropped monsters table.');
  }

  static createTable(connection: PoolConnection)
  {
    const query: string = `
      CREATE TABLE IF NOT EXISTS monsters (
        id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
        monster_name varchar(255) NOT NULL,
        armor_class int NOT NULL,
        hit_points int NOT NULL,
        monster_type varchar(255) NOT NULL,
        PRIMARY KEY (id)
      )
    `;

    connection.execute(query);
    console.log('Created monsters table.');
  }

  static insert(connection: PoolConnection, monster: Monster)
  {
    const query: string = 
      'INSERT INTO `monsters` (`monster_name`, `armor_class`, `hit_points`, `monster_type`) VALUES (?, ?, ?, ?)';

    // Execute expects an array of values.
    connection.execute(query, Object.values(monster));
    console.log('Inserted monster into table.');
  }

  static insertMany(connection: PoolConnection, monsters: Monster[])
  {
    const query: string = 
      'INSERT INTO `monsters` (`monster_name`, `armor_class`, `hit_points`, `monster_type`) VALUES (?, ?, ?, ?)';

    monsters.map((monster) =>
    {
      connection.execute(query, Object.values(monster));
    });

    console.log(`Inserted ${monsters.length} monsters into table.`);
  }
}