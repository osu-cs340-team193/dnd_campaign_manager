import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { 
  Entity,
  EntityAttribute,
  EntityAttributeFilter,
  EntityAttributeValuePair,
} from "@/app/lib/entity";
import { Query } from '@/app/lib/query';

export class MonstersEntity extends Entity
{
  static tableName: string = 'monsters';

  static id: EntityAttribute = 'id';
  static monster_name: EntityAttribute = 'monster_name';
  static armor_class: EntityAttribute = 'armor_class';
  static hit_points: EntityAttribute = 'hit_points';
  static monster_type: EntityAttribute = 'monster_type';

  public static async dropTable(connection: PoolConnection) : Promise<any>
  {
    const query: string = `
      DROP TABLE IF EXISTS ${this.tableName} 
    `;

    const result = await connection.execute(query);
    console.log(`Dropped ${this.tableName} table.`);

    return result;
  }

  public static async createTable(connection: PoolConnection) : Promise<any>
  {
    const query: string = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        ${this.id} int(11) NOT NULL AUTO_INCREMENT UNIQUE,
        ${this.monster_name} varchar(255) NOT NULL,
        ${this.armor_class} int NOT NULL,
        ${this.hit_points} int NOT NULL,
        ${this.monster_type} varchar(255) NOT NULL,
        PRIMARY KEY (id)
      )
    `;

    const result = await connection.execute(query);
    console.log(`Created ${this.tableName} table.`);

    return result;
  }

  public static async insert(connection: PoolConnection, value: Monster) : Promise<any>
  {
    let query: string = '';

    query += Query.insert(this.tableName, [this.monster_name, this.armor_class, this.hit_points, this.monster_type]);

    // Execute expects an array of values.
    console.log(`Executing query: ${query}`);
    const result = await connection.execute(query, Object.values(value));
    console.log('Inserted monster into table.');

    return result;
  }

  public static async insertMany(connection: PoolConnection, values: Monster[]) : Promise<any>
  {
    let query: string = '';

    query += Query.insert(this.tableName, [this.monster_name, this.armor_class, this.hit_points, this.monster_type]);

    console.log(`Executing query: ${query}`);
    values.map(async (value) =>
    {
      await connection.execute(query, Object.values(value));
    });

    console.log(`Inserted ${values.length} monsters into table.`);
  }

  public static async selectAll(connection: PoolConnection, filters?: EntityAttributeFilter[], filtersOptional?: boolean, limit?: number) : Promise<IMonster[]>
  {
    let query: string = '';

    query += Query.select();
    query += Query.all();
    query += Query.from(this.tableName);

    if (filters)
    {
      query += Query.where(filters, filtersOptional);
    }

    if (limit)
    {
      query += Query.limit(limit);
    }

    console.log(`Executing query: ${query}`);
    const result = await connection.execute<IMonster[]>(query);

    return result[0];
  }

  public static async select(connection: PoolConnection, attrs: EntityAttribute[], filters?: EntityAttributeFilter[], limit?: number): Promise<IMonster[]>
  {
    let query: string = '';

    query += Query.select(attrs);
    query += Query.from(this.tableName);
    if (filters)
    {
      query += Query.where(filters);
    }

    if (limit)
    {
      query += Query.limit(limit);
    }

    console.log(`Executing query: ${query}`);
    const result = await connection.execute<IMonster[]>(query);

    return result[0];
  }

  public static async update(connection: PoolConnection, attrs: EntityAttribute[], vals: any[], filters?: EntityAttributeFilter[], filtersOptional?: boolean, limit?: number) : Promise<any>
  {
    let query: string = '';

    query += Query.update(this.tableName);
    query += Query.set(attrs, vals);
    if (filters)
    {
      query += Query.where(filters, filtersOptional);
    }
    if (limit)
    {
      query += Query.limit(limit);
    }

    console.log(`Executing query: ${query}`);
    return await connection.execute(query);
  }

  public static async delete(connection: PoolConnection, filters: EntityAttributeFilter[], filtersOptional?: boolean, limit?: number) : Promise<any>
  {
    let query: string = '';

    query += Query.delete();
    query += Query.from(this.tableName);
    query += Query.where(filters, filtersOptional);
    if (limit)
    {
      query += Query.limit(limit);
    }
    
    console.log(`Executing query: ${query}`);
    return await connection.execute(query);
  }
}

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
export type Monster = 
{
  id?: number;
  monster_name: string;
  armor_class: number;
  hit_points: number;
  monster_type: string;
};