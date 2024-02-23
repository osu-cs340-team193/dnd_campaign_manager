import { 
  ComparisonOp, 
  EntityAttribute,
  EntityAttributeFilter,
  EntityAttributeValuePair,
} from "@/app/lib/entities/entity";

export const lessThan: ComparisonOp = '<';
export const lessThanEqual: ComparisonOp = '<=';
export const equalTo: ComparisonOp = '=';
export const greaterThan: ComparisonOp = '>';
export const greaterThanEqual: ComparisonOp = '>=';

export class Query 
{
  static insert(tableName: string, attrs: EntityAttribute[]) : string
  {
    let query: string = ` INSERT INTO \`${tableName}\` (`;

    attrs.map((attr, index) =>
    {
      query += `\`${attr}\``;
      if (index < attrs.length - 1)
      {
        query += ', ';
      }
    });

    query += ' ) VALUES (';
    query += '?, '.repeat(attrs.length - 1);
    query += '?)';

    return query;
  }

  static select(attrs?: EntityAttribute[]) : string
  {
    let query: string = ' SELECT ';

    attrs?.map((attr, index) =>
    {
      query += `\`${attr}\``;
      if (index < attrs.length - 1)
      {
        query += ', ';
      }
    });

    return query;
  }

  static update(tableName: string) : string
  {
    return ` UPDATE \`${tableName}\``;
  }

  static delete() : string
  {
    return ` DELETE `;
  }

  static all() : string
  {
    return ' * ';
  }

  static from(tableName: string) : string
  {
    return ` FROM \`${tableName}\` `;
  }

  static set(attrs: EntityAttribute[], vals: any[]) : string
  {
    let query: string = ' SET ';

    attrs.map((attr, index) =>
    {
      query += `\`${attr}\` = '${vals[index]}'`; 
      if (index < attrs.length - 1)
      {
        query += ', ';
      }
    });

    return query;
  }

  static where(filters: EntityAttributeFilter[], filtersOptional: boolean = false) : string
  {
    let query: string = ' WHERE ';

    const logicalOp: string = filtersOptional? 'OR' : 'AND';
    filters.map((filter, index) =>
    {
      query += `\`${filter.attr}\` ${filter.op} '${filter.value}'`;
      if (index < filters.length - 1)
      {
        query += ` ${logicalOp} `;
      }
    });

    return query;
  }

  static limit(count: number) : string
  {
    return ` LIMIT ${count} `;
  }
}