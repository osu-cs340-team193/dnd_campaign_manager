import { PoolConnection, RowDataPacket } from "mysql2/promise";

// Base class for database entity.
export abstract class Entity 
{
  public static dropTable(connection: PoolConnection) : Promise<any> { throw new Error('Not implemented') };
  public static createTable(connection: PoolConnection) : Promise<any> { throw new Error('Not implemented') };
  public static insert(connection: PoolConnection, value: any) : Promise<any> { throw new Error('Not implemented') };
  public static insertMany(connection: PoolConnection, values: any[]) : Promise<any> { throw new Error('Not implemented') };
  public static selectAll(connection: PoolConnection, filters?: EntityAttributeFilter[], filtersOptional?: boolean, limit?: number) : Promise<RowDataPacket[]> { throw new Error('Not implemented') };
  public static select(connection: PoolConnection, attrs: EntityAttribute[], filters?: EntityAttributeFilter[], limit?: number): Promise<RowDataPacket[]> { throw new Error('Not implemented') };
  public static update(connection: PoolConnection, attrs: EntityAttribute[], vals: any[], filters?: EntityAttributeFilter[], filtersOptional?: boolean, limit?: number) : Promise<any> { throw new Error('Not implemented') };
  public static delete(connection: PoolConnection, filters: EntityAttributeFilter[], filtersOptional?: boolean, limit?: number) : Promise<any> { throw new Error('Not implemented') };
}

export type EntityAttribute = string;
export type ComparisonOp = string;

export type EntityAttributeValuePair =
{
  attr: string;
  value: any;
}

export type EntityAttributeFilter =
{
  attr: string;
  op: ComparisonOp;
  value: any;
}