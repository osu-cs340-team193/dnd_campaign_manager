import 
{ 
  PoolConnection, 
} from 'mysql2/promise';
import log from 'loglevel';
import 
{
  Monster,
  IMonster,
  IMonsterType,
  Campaign,
  ICampaign,
  IDungeonMaster,
  ILocation,
  ICampaignTitle,
  IMonsterName,
  Location,
  IAction,
  Action,
  IItem,
  ILocationName,
  Item,
  IItemName,
  ILocationMonster,
  LocationMonster,
  ILocationItem,
  LocationItem,
  IActionName,
} from '@/app/lib/definitions';

// Change this to 'trace' for more verbose logging
log.setLevel('info');

// Defines all database queries used by this app.
export default class Query 
{
  /****************************************************************************************


  Campaigns


  *****************************************************************************************/
  static campaignsTable: string = 'Campaigns';

  static campaign_id: string = 'campaign_id';
  static title: string = 'title';
  static start_date: string = 'start_date';
  static end_date: string = 'end_date';
  static dungeon_master: string = 'dungeon_master';

  /* 
  Retrieve all Campaign entries

  SELECT *
  FROM Campaigns;
  */
  public static async getAllCampaigns(connection: PoolConnection): Promise<ICampaign[]> {
    const query: string = `
      SELECT campaign_id, title, 
             DATE_FORMAT(start_date, '%Y-%m-%d') as start_date,
             DATE_FORMAT(end_date, '%Y-%m-%d') as end_date,
             dungeon_master
      FROM ${this.campaignsTable}
    `;
  
    log.debug(`Executing Query: ${query}`);
  
    const result = await connection.execute<ICampaign[]>(query);
  
    log.info(`Retrieved ${result[0].length} campaigns from ${this.campaignsTable} table.`);
    log.debug(`Campaigns: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
  
    return result[0];
  }

  /*
  Select a single campaign by id 

  SELECT *
  FROM Campaigns 
  WHERE campaign_id = :id;
  */
  public static async getCampaignById(connection: PoolConnection, id: number): Promise<ICampaign>
  {
    const query: string = `
    SELECT ${this.campaign_id}, ${this.title}, 
            DATE_FORMAT(${this.start_date}, '%Y-%m-%d') as start_date,
            DATE_FORMAT(${this.end_date}, '%Y-%m-%d') as end_date,
            ${this.dungeon_master}
    FROM ${this.campaignsTable}
    WHERE ${this.campaign_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ICampaign[]>(query);

    log.info(`Retrieved campaign from ${this.campaignsTable} table.`);
    log.debug(`Campaign: ${JSON.stringify(result[0][0])}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
    
    // Second value in result array holds query metadata that we don't care about.
    // Similarly, we only expect to get one result back, so we return first element only.
    return result[0][0];
  }

  /*
  Get all unique campaign titles 

  SELECT DISTINCT title 
  FROM Campaigns 
  ORDER BY title ASC;
  */
  public static async getAllCampaignTitles(connection: PoolConnection) : Promise<ICampaignTitle[]>
  {
    const query: string = `
    SELECT DISTINCT ${this.campaign_id}
    FROM ${this.campaignsTable}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ICampaignTitle[]>(query);

    log.info(`Retrieved ${result[0].length} titles from ${this.campaignsTable} table.`);
    log.debug(`Titles: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Get all unique dungeon masters 

  SELECT DISTINCT dungeon_master 
  FROM Campaigns 
  ORDER BY dungeon_master ASC;
  */
  public static async getAllDungeonMasters(connection: PoolConnection) : Promise<IDungeonMaster[]>
  {
    const query: string = `
    SELECT DISTINCT ${this.dungeon_master}
    FROM ${this.campaignsTable}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IDungeonMaster[]>(query);

    log.info(`Retrieved ${result[0].length} dungeon masters from ${this.campaignsTable} table.`);
    log.debug(`Dungeon Masters: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Add a new campaign 

  INSERT INTO Campaigns (
    title, 
    start_date, 
    end_date, 
    dungeon_master
  )
  VALUE (
    :title_value, 
    :start_date_value, 
    :end_date_value, 
    :dungeon_master_value
  )
  */
  public static async addCampaign(connection: PoolConnection, value: Campaign) : Promise<any>
  {
    let startDate: string | null = null;
    let endDate: string | null = null;
  
    // Only convert if value.start_date is not null.
    if (value.start_date !== null) {
      startDate = new Date(value.start_date).toISOString().split('T')[0];
    }
  
    // Only convert if value.end_date is not null.
    if (value.end_date !== null) {
      endDate = new Date(value.end_date).toISOString().split('T')[0];
    }

    const query: string = `
      INSERT INTO ${this.campaignsTable} (
        ${this.title},
        ${this.start_date},
        ${this.end_date},
        ${this.dungeon_master}
      )
      VALUES (?, ?, ?, ?)
      `;

    const params = [value.title, startDate, endDate, value.dungeon_master];    

    log.debug(`Executing Query: ${query} with params ${params}`);

    const result = await connection.execute(query, params);

    log.info(`Inserted new campaign into ${this.campaignsTable} table.`);
    log.debug(`Campaign: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Update a campaign 

  UPDATE Campaigns 
  SET 
    title = :title_value, 
    start_date = :start_date_value, 
    end_date = :end_date_value, 
    dungeon_master = :dungeon_master_value
  WHERE campaign_id = :id;
  */
  public static async updateCampaignById(connection: PoolConnection, value: Campaign): Promise<any> {
    // Convert datetime strings to date-only strings if  they are't null
    let startDate: string | null = value.start_date !== null ? new Date(value.start_date).toISOString().split('T')[0] : null;
    let endDate: string | null = value.end_date !== null ? new Date(value.end_date).toISOString().split('T')[0] : null;
  
    const query: string = `
      UPDATE ${this.campaignsTable}
      SET
        ${this.title} = ?,
        ${this.start_date} = ?,
        ${this.end_date} = ?,
        ${this.dungeon_master} = ?
      WHERE ${this.campaign_id} = ?
    `;
  
    const params = [value.title, startDate, endDate, value.dungeon_master, value.campaign_id];
  
    log.debug(`Executing Query: ${query} with params ${params}`);
  
    const [result] = await connection.execute(query, params);
  
    log.info(`Updated campaign with ${this.campaign_id} = ${value.campaign_id}.`);
    log.debug(`Campaign: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
  
    return result;
  }

  /*
  Delete campaign 

  DELETE 
  FROM Campaign 
  WHERE campaign_id = :id
  */
  public static async deleteCampaignById(connection: PoolConnection, id: number) : Promise<any>
  {
    const query: string = `
      DELETE
      FROM ${this.campaignsTable}
      WHERE ${this.campaign_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Deleted campaign with ${this.campaign_id} = ${id}.`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /****************************************************************************************


  Locations


  *****************************************************************************************/
  static locationsTable: string = 'Locations';
  static locations_monstersTable: string = 'Locations_Monsters';
  static locations_itemsTable: string = 'Locations_Items';
  static location_id: string = 'location_id';
  static campaign_name: string = 'campaign_name';
  static location_name: string = 'location_name';
  static location_description: string = 'location_description';
  

  /* 
  Retrieve all Locations entries and join to show the relevant campaign name instead of the title

  SELECT 
      C.title AS 'campaign_name', 
      L.location_name, 
      L.location_description
  FROM Locations L
  INNER JOIN Campaigns C ON Campaigns.campaign_id = Locations.campaign_id;
  */
  public static async getAllLocations(connection: PoolConnection) : Promise<ILocation[]>
  {
    const query: string = `
    SELECT location_name, campaign_name, location_description
    FROM ${this.locationsTable}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ILocation[]>(query);

    log.info(`Retrieved ${result[0].length} locations from ${this.locationsTable} table.`);
    log.debug(`Locations: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Select a single location for the update location form and join to show the relevant campaign name instead of the title

  SELECT 
      C.title AS 'campaign_name',
      L.locatin_name,
      L.location_description
  FROM Locations L
  INNER JOIN Campaigns C ON Campaigns.campaign_id = Locations.campaign_id
  WHERE location_id = :id;
  */
  public static async getLocationById(connection: PoolConnection, id: number): Promise<ILocation>
  {
    const query: string = `
    SELECT ${this.location_id}, ${this.campaign_name}, ${this.location_name}, ${this.location_description}
    FROM ${this.locationsTable}
    WHERE ${this.location_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ILocation[]>(query);

    log.info(`Retrieved location from ${this.locationsTable} table.`);
    log.debug(`Location: ${JSON.stringify(result[0][0])}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
    
    // Second value in result array holds query metadata that we don't care about.
    // Similarly, we only expect to get one result back, so we return first element only.
    return result[0][0];
  }

  /*
  Get all unique location names 

  SELECT DISTINCT location_name 
  FROM Locations 
  ORDER BY location_name ASC;
  */
  public static async getAllLocationNames(connection: PoolConnection) : Promise<ILocationName[]>
  {
    const query: string = `
    SELECT DISTINCT ${this.location_name}
    FROM ${this.locationsTable}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ILocationName[]>(query);

    log.info(`Retrieved ${result[0].length} location names from ${this.locationsTable} table.`);
    log.debug(`Location Names: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Get all monsters for this location with user friendly names

  SELECT 
    M.monster_name AS 'monster_name'
  FROM Locations_Monsters LM
    INNER JOIN Locations L ON L.location_id = LM.lid
    INNER JOIN Monsters M ON M.monster_id = LM.mid
  WHERE L.location_id = :id;
  */
  public static async getAllLocationMonsterNamesById(connection: PoolConnection, id: number) : Promise<IMonsterName[]>
  {
    const query: string = `
    SELECT ${this.monster_name}
    FROM ${this.locations_monstersTable}
    INNER JOIN ${this.locationsTable} ON ${this.location_id}
    INNER JOIN ${this.monstersTable} ON ${this.monster_id}
    WHERE ${this.location_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IMonsterName[]>(query);

    log.info(`Retrieved ${result[0].length} monster names from ${this.locationsMonstersTable} table.`);
    log.debug(`Monster Names: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Get all items for this location with user friendly names

  SELECT 
    I.item_name AS 'item_name'
  FROM Locations_Items LI
    INNER JOIN Locations L ON L.location_id = LI.lid
    INNER JOIN Items I ON I.item_id = LI.iid
  WHERE L.location_id = :id;
  */
  public static async getAllLocationItemNamesById(connection: PoolConnection, id: number) : Promise<IItemName[]>
  {
    const query: string = `
    SELECT ${this.item_name}
    FROM ${this.locations_itemsTable}
    INNER JOIN ${this.locationsTable} ON ${this.location_id}
    INNER JOIN ${this.itemsTable} ON ${this.item_id}
    WHERE ${this.location_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IItemName[]>(query);

    log.info(`Retrieved ${result[0].length} item names from ${this.locationsItemsTable} table.`);
    log.debug(`Item Names: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Add a new campaign 

  INSERT INTO Locations (
      campaign_id, 
      location_name, 
      location_description
  )
  VALUE (
      :campaign_id_value, 
      :location_name_value, 
      :location_description_value
  );
  */
  public static async addLocation(connection: PoolConnection, value: Location) : Promise<any>
  {
    const query: string = `
    INSERT INTO ${this.locationsTable} (
      ${this.campaign_name}, 
      ${this.location_name}, 
      ${this.location_description}
    )
    VALUE (${value.campaign_name}, ${value.location_name}, ${value.location_description})
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Inserted new location into ${this.locationsTable} table.`);
    log.debug(`Location: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Update a location 

  UPDATE Locations 
  SET 
      campaign_id = :campaign_id_value, 
      location_name = :location_name_value, 
      location_description = :location_description_value
  WHERE location_id = :id;
  */
  public static async updateLocationById(connection: PoolConnection, value: Location) : Promise<any>
  {
    const query: string = `
    UPDATE ${this.locationsTable} 
    SET 
      ${this.campaign_name} = ${value.campaign_name}, 
      ${this.location_name} = ${value.location_name}, 
      ${this.location_description} = ${value.location_description}
    WHERE ${this.location_id} = ${value.location_id};
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Updated location with ${this.location_id} = ${value.location_id}.`);
    log.debug(`Location: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Delete location 

  DELETE 
  FROM Locations
  WHERE location_id = :id
  */
  public static async deleteLocationById(connection: PoolConnection, id: number) : Promise<any>
  {
    const query: string = `
    DELETE 
    FROM ${this.locationsTable}
    WHERE ${this.location_id} = ${id};
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Deleted location with ${this.location_id} = ${id}.`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /****************************************************************************************


  Monsters


  *****************************************************************************************/
  static monstersTable: string = 'Monsters';

  static monster_id: string = 'monster_id';
  static monster_name: string = 'monster_name';
  static armor_class: string = 'armor_class';
  static hit_points: string = 'hit_points';
  static monster_type: string = 'monster_type';

  /* 
  Retrieve all Monsters entries

  SELECT *
  FROM Monsters;
  */
  public static async getAllMonsters(connection: PoolConnection) : Promise<IMonster[]>
  {
    const query: string = `
      SELECT * 
      FROM ${this.monstersTable}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IMonster[]>(query);

    log.info(`Retrieved ${result[0].length} monsters from ${this.monstersTable} table.`);
    log.debug(`Monsters: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Select a single monster by id 

  SELECT *
  FROM Monsters 
  WHERE monster_id = :id;
  */
  public static async getMonsterById(connection: PoolConnection, id: number): Promise<IMonster>
  {
    const query: string = `
      SELECT * 
      FROM ${this.monstersTable}
      WHERE ${this.monster_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IMonster[]>(query);

    log.info(`Retrieved monster from ${this.monstersTable} table.`);
    log.debug(`Monster: ${JSON.stringify(result[0][0])}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
    
    // Second value in result array holds query metadata that we don't care about.
    // Similarly, we only expect to get one result back, so we return first element only.
    return result[0][0];
  }

  /*
  Get all unique monster names 

  SELECT DISTINCT monster_name 
  FROM Monsters
  ORDER BY monster_name ASC;
  */
  public static async getAllMonsterNames(connection: PoolConnection) : Promise<IMonsterName[]>
  {
    const query: string = `
      SELECT DISTINCT ${this.monster_name} 
      FROM ${this.monstersTable}
      ORDER BY ${this.monster_name} ASC
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IMonsterName[]>(query);

    log.info(`Retrieved ${result[0].length} monster names from ${this.monstersTable} table.`);
    log.debug(`Monster Names: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Get all unique monster types 

  SELECT DISTINCT monster_type
  FROM Monsters
  ORDER BY monster_type ASC;
  */
  public static async getAllMonsterTypes(connection: PoolConnection) : Promise<IMonsterType[]>
  {
    const query: string = `
      SELECT DISTINCT ${this.monster_type} 
      FROM ${this.monstersTable}
      ORDER BY ${this.monster_type} ASC
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IMonsterType[]>(query);

    log.info(`Retrieved ${result[0].length} monster types from ${this.monstersTable} table.`);
    log.debug(`Monster Types: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Add a new monster

  INSERT INTO Monsters (monster_name, armor_class, hit_points, monster_type)
  VALUE (
    :monster_name_value, 
    :armor_class_value, 
    :hit_points_value, 
    :monster_type_value
  )
  */
  public static async addMonster(connection: PoolConnection, value: Monster) : Promise<any>
  {
    const query: string = `
      INSERT INTO ${this.monstersTable} (
        ${this.monster_name},
        ${this.armor_class},
        ${this.hit_points},
        ${this.monster_type}
      )
      VALUE (
        '${value.monster_name}',
        ${value.armor_class},
        ${value.hit_points},
        '${value.monster_type}'
      )
    `

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Inserted new monster into ${this.monstersTable} table.`);
    log.debug(`Monster: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Update a monster

  UPDATE Monsters 
  SET 
    monster_name = :monster_name_value, 
    armor_class = :armor_class_value, 
    hit_points = :hit_points_value, 
    monster_type = :monster_type_value
  WHERE monster_id = :id;
  */
  public static async updateMonsterById(connection: PoolConnection, value: Monster) : Promise<any>
  {
    const query: string = `
      UPDATE ${this.monstersTable}
      SET
        ${this.monster_name} = '${value.monster_name}',
        ${this.armor_class} = ${value.armor_class},
        ${this.hit_points} = ${value.hit_points},
        ${this.monster_type} = '${value.monster_type}'
      WHERE ${this.monster_id} = ${value.monster_id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Updated monster with ${this.monster_id} = ${value.monster_id}.`);
    log.debug(`Monster: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Delete monster

  DELETE 
  FROM Monsters
  WHERE monster_id = :id
  */
  public static async deleteMonsterById(connection: PoolConnection, id: number) : Promise<any>
  {
    const query: string = `
      DELETE
      FROM ${this.monstersTable}
      WHERE ${this.monster_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Deleted monster with ${this.monster_id} = ${id}.`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Get all locations for this monster with user friendly names

  SELECT
    L.location_name AS 'location_name'
  FROM Locations_Monsters LM
    INNER JOIN Locations L ON L.location_id = LM.location_id
    INNER JOIN Monsters M ON M.monster_id = LM.monster_id
  WHERE M.monster_id = :id
  */
  public static async getAllMonsterLocationNamesById(connection: PoolConnection, id: number) : Promise<ILocationName[]>
  {
    const query: string = `
      SELECT
        L.location_name AS 'location_name'
      FROM Locations_Monsters LM
        INNER JOIN Locations L ON L.location_id = LM.location_id
        INNER JOIN Monsters M ON M.monster_id = LM.monster_id
      WHERE M.monster_id = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ILocationName[]>(query);

    log.info(`Retrieved ${result[0].length} location names from ${this.locationsTable} table.`);
    log.debug(`Location Names: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Get all actions for this monster with user friendly names

  SELECT
    A.action_name AS 'action_name'
  FROM Actions A 
    INNER JOIN Monsters M ON M.monster_id = A.monster_id
  WHERE M.monster_id = :id
  */
  public static async getAllMonsterActionNamesById(connection: PoolConnection, id: number) : Promise<IActionName[]>
  {
    const query: string = `
      SELECT
        A.action_name AS 'action_name'
      FROM Actions A 
        INNER JOIN Monsters M ON M.monster_id = A.monster_id
      WHERE M.monster_id = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IActionName[]>(query);

    log.info(`Retrieved ${result[0].length} action names from ${this.actionsTable} table.`);
    log.debug(`Action Names: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /****************************************************************************************


  Actions


  *****************************************************************************************/
  static actionsTable: string = 'Actions';

  static action_id: string = 'action_id';
  static action_name: string = 'action_name';
  static description: string = 'description';

  /* 
  Retrieve all Action entries and join to show the relevant monster name instead of the id 

  SELECT 
      A.action_name, 
      M.monster_name AS 'monster_name', 
      A.description
  FROM Actions A
  INNER JOIN Monsters M ON Monsters.monster_id = Actions.monster_id;
  */
  public static async getAllActions(connection: PoolConnection) : Promise<IAction[]>
  {
    const query: string = `
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IAction[]>(query);

    log.info(`Retrieved ${result[0].length} actions from ${this.actionsTable} table.`);
    log.debug(`Actions: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Select a single action for the update action form
  SELECT 
      A.action_name, 
      M.monster_name AS 'monster_name', 
      A.description
  FROM Actions A
  INNER JOIN Monsters M ON Monsters.monster_id = Actions.monster_id
  WHERE action_id = :id;
  */
  public static async getActionById(connection: PoolConnection, id: number): Promise<IAction>
  {
    const query: string = `
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IAction[]>(query);

    log.info(`Retrieved action from ${this.actionsTable} table.`);
    log.debug(`Action: ${JSON.stringify(result[0][0])}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
    
    // Second value in result array holds query metadata that we don't care about.
    // Similarly, we only expect to get one result back, so we return first element only.
    return result[0][0];
  }

  /*
  Add a new action
  INSERT INTO Actions (
      action_name, 
      monster_name, 
      description
  )
  VALUE (
      :action_name_value, 
      :(SELECT monster_id FROM Monsters 
        WHERE monster_name = :monster_name_value),
      :description_value
  );
  */
  public static async addAction(connection: PoolConnection, value: Action) : Promise<any>
  {
    const query: string = `
    `

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Inserted new action into ${this.actionsTable} table.`);
    log.debug(`Action: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Update action

  UPDATE Actions 
  SET 
      action_name = :action_name_value, 
      monster_name = :monster_name_value, 
      description = description_value:
  WHERE action_id = :id
  */
  public static async updateActionById(connection: PoolConnection, value: Action) : Promise<any>
  {
    const query: string = `
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Updated action with ${this.action_id} = ${value.action_id}.`);
    log.debug(`Action: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Delete Action 

  DELETE 
  FROM Actions 
  WHERE action_id = :id
  */
  public static async deleteActionById(connection: PoolConnection, id: number) : Promise<any>
  {
    const query: string = `
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Deleted action with ${this.action_id} = ${id}.`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /****************************************************************************************


  Items


  *****************************************************************************************/
  static itemsTable: string = 'Items';

  static item_id: string = 'item_id';
  static item_name: string = 'item_name';
  static value: string = 'value';
  static weight: string = 'weight';

  /* 
  Retrieve all Item entries

  SELECT *
  FROM Items
  */
  public static async getAllItems(connection: PoolConnection) : Promise<IItem[]>
  {
    const query: string = `
    SELECT *
    FROM ${this.itemsTable}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IItem[]>(query);

    log.info(`Retrieved ${result[0].length} items from ${this.itemsTable} table.`);
    log.debug(`Items: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Select a single item for the update item form

  SELECT *
  FROM Items
  WHERE item_id = :id
  */
  public static async getItemById(connection: PoolConnection, id: number): Promise<IItem>
  {
    const query: string = `
    SELECT *
    FROM ${this.itemsTable}
    WHERE ${this.item_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IItem[]>(query);

    log.info(`Retrieved item from ${this.itemsTable} table.`);
    log.debug(`Item: ${JSON.stringify(result[0][0])}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
    
    // Second value in result array holds query metadata that we don't care about.
    // Similarly, we only expect to get one result back, so we return first element only.
    return result[0][0];
  }

  /* 
  Get all unique item names

  SELECT DISTINCT item_name
  FROM Items
  ORDER BY item_name ASC
  */
  public static async getAllItemNames(connection: PoolConnection) : Promise<IItemName[]>
  {
    const query: string = `
    SELECT DISTINCT ${this.item_name}
    FROM ${this.itemsTable}
    ORDER BY ${this.item_name} ASC
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<IItemName[]>(query);

    log.info(`Retrieved ${result[0].length} item names from ${this.itemsTable} table.`);
    log.debug(`Item Names: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Get all items for this location with user friendly names

  SELECT 
    L.location_name AS 'location_name'
  FROM Locations_Items LI
    INNER JOIN Locations L ON L.location_id = LI.lid
    INNER JOIN Items I ON I.item_id = LI.iid
  WHERE I.item_id = :id;
  */
  public static async getAllItemLocationNamesById(connection: PoolConnection, id: number) : Promise<ILocationName[]>
  {
    const query: string = `
    SELECT ${this.location_name}
    FROM ${this.locations_itemsTable}
    INNER JOIN ${this.locationsTable} ON ${this.location_id}
    INNER JOIN ${this.itemsTable} ON ${this.item_id}
    WHERE ${this.item_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ILocationName[]>(query);

    log.info(`Retrieved ${result[0].length} location names from ${this.itemsTable} table.`);
    log.debug(`Location Names: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Add a new item

  INSERT INTO Items (
      item_name, 
      value, 
      weight
  )
  VALUE (
      :item_name_value, 
      :value_value, 
      :weight_value
  )
  */
  public static async addItem(connection: PoolConnection, value: Item) : Promise<any>
  {
    const query: string = `
    INSERT INTO ${this.itemsTable} (
      ${this.item_name}, 
      ${this.value}, 
      ${this.weight}
    )
    VALUE (
      ${value.item_name}, 
      ${value.value}, 
      ${value.weight}
    )
    `

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Inserted new item into ${this.itemsTable} table.`);
    log.debug(`Item: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Update action

  UPDATE Items 
  SET 
      item_name = :item_name_value, 
      value = :value_value, 
      weight = :weight_value
  WHERE item_id = :id;
  */
  public static async updateItemById(connection: PoolConnection, value: Item) : Promise<any>
  {
    const query: string = `
    UPDATE ${this.itemsTable}
    SET 
    ${this.item_name} = ${value.item_name}, 
    ${this.value} = ${value.value}, 
    ${this.weight} = ${value.value}
    WHERE ${this.item_id} = ${value.item_id};
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Updated location with ${this.item_id} = ${value.item_id}.`);
    log.debug(`Item: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Delete Item 

  DELETE 
  FROM Items 
  WHERE item_id = :id
  */
  public static async deleteItemById(connection: PoolConnection, id: number) : Promise<any>
  {
    const query: string = `
    DELETE 
    FROM ${this.itemsTable} 
    WHERE ${this.item_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Deleted item with ${this.item_id} = ${id}.`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /****************************************************************************************


  Locations_Monsters


  *****************************************************************************************/
  static locationsMonstersTable: string = 'Locations_Monsters';

  static location_monster_id: string = 'location_monster_id';

  /* 
  Return all entries from table in a user friendly manner (using names)

  SELECT 
      L.location_name AS 'location_name', 
      M.monster_name AS 'monster_name'
  FROM Locations_Monsters LM
    INNER JOIN Locations L ON L.location_id = LM.location_id
      INNER JOIN Monsters M ON M.monster_id = LM.monster_id;
  */
  public static async getAllLocationsMonsters(connection: PoolConnection) : Promise<ILocationMonster[]>
  {
    const query: string = `
    SELECT 
      ${this.location_name}, 
      ${this.monster_name}'
    FROM ${this.locationsMonstersTable}
    INNER JOIN ${this.locationsTable} ON ${this.location_id} 
    INNER JOIN ${this.monstersTable}  ON ${this.monster_id};
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ILocationMonster[]>(query);

    log.info(`Retrieved ${result[0].length} locations monsters from ${this.locationsMonstersTable} table.`);
    log.debug(`Locations_Monsters: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Select a single location monster for the update location monster form

  SELECT 
      LM.location_monster_id,
      L.location_name AS 'location_name', 
      M.monster_name AS 'monster_name'
  FROM Locations_Monsters LM
    INNER JOIN Locations L ON L.location_id = LM.location_id
      INNER JOIN Monsters M ON M.monster_id = LM.monster_id
  WHERE LM.location_monster_id = :id;
  */
  public static async getLocationMonsterById(connection: PoolConnection, id: number): Promise<ILocationMonster>
  {
    const query: string = `
    SELECT 
      ${this.location_monster_id},
      ${this.location_id}, 
      ${this.monster_id}
    FROM ${this.locationsMonstersTable}
    INNER JOIN ${this.locationsTable} ON ${this.location_id}
    INNER JOIN ${this.monstersTable} ON ${this.monster_id}
    WHERE ${this.location_monster_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ILocationMonster[]>(query);

    log.info(`Retrieved location monster from ${this.locationsMonstersTable} table.`);
    log.debug(`Location Monster: ${JSON.stringify(result[0][0])}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
    
    // Second value in result array holds query metadata that we don't care about.
    // Similarly, we only expect to get one result back, so we return first element only.
    return result[0][0];
  }

  /*
  Add a new location monster

  INSERT INTO Locations_Monsters (
      location_id,
      monster_id
  )
  VALUE (
      (SELECT location_id 
      FROM Locations
      WHERE location_name = :location_name_value),
      (SELECT monster_id 
      FROM Monsters 
      WHERE monster_name = :monster_name_value)
  );
  */
  public static async addLocationMonster(connection: PoolConnection, value: LocationMonster) : Promise<any>
  {
    const query: string = `
    INSERT INTO Locations_Monsters (
      ${this.location_id},
      ${this.monster_id}
  )
  VALUE (
      (SELECT ${this.location_id}
      FROM ${this.locationsTable}
      WHERE ${this.location_name} = ${value.location_name},
      (SELECT ${this.monster_id} 
      FROM ${this.monstersTable} 
      WHERE ${this.monster_name} = ${value.monster_name})
  );
    `

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Inserted new location monster into ${this.locationsMonstersTable} table.`);
    log.debug(`Location Monster: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Update location monster

  UPDATE Locations_Monsters
  SET
      location_id = (SELECT location_id
                    FROM Locations
                    WHERE location_name = :location_name_value),
      monster_id = (SELECT monster_id
                    FROM Monsters 
                    WHERE monster_name = :monster_name_value)
  WHERE location_monster_id = :id;
  */
  public static async updateLocationMonsterById(connection: PoolConnection, value: LocationMonster, id: number) : Promise<any>
  {
    const query: string = `
    UPDATE ${this.locationsMonstersTable}
    SET
      ${this.location_id} = (SELECT ${this.location_id}
                    FROM ${this.locationsTable}
                    WHERE ${this.location_name} = ${value.location_name}),
      ${this.monster_id} = (SELECT ${this.monster_id}
                    FROM ${this.monstersTable} 
                    WHERE ${this.monster_name} = ${value.monster_name})
    WHERE ${this.location_monster_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Updated location monster with ${this.location_monster_id} = ${value.location_monster_id}.`);
    log.debug(`Location Monster: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /*
  Delete location monster

  DELETE
  FROM Locations_Monsters
  WHERE location_monster_id = :id;
  */
  public static async deleteLocationMonsterById(connection: PoolConnection, id: number) : Promise<any>
  {
    const query: string = `
    DELETE
    FROM ${this.locationsMonstersTable}
    WHERE ${this.location_monster_id} = ${id}
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute(query);

    log.info(`Deleted location monster with ${this.location_monster_id} = ${id}.`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    return result;
  }

  /****************************************************************************************


  Locations_Items


  *****************************************************************************************/
  static locationsItemsTable: string = 'Locations_Items';

  static location_item_id: string = 'location_item_id';

  /* 
  Return all entries from table in a user friendly manner (using names)

  SELECT 
      LI.location_item_id,
      L.location_name AS 'location_name', 
      I.item_name AS 'item_name'
  FROM Locations_Items LI
    INNER JOIN Locations L ON L.location_id = LI.location_id
      INNER JOIN Items I ON I.item_id = LI.item_id;
  */
  public static async getAllLocationsItems(connection: PoolConnection) : Promise<ILocationItem[]>
  {
    const query: string = `
    SELECT 
      location_item_id,
      location_name,
      item_name

    FROM ${this.locationsItemsTable} 
      INNER JOIN ${this.locationsTable} ON ${this.locationsTable}.location_id = ${this.locationsItemsTable}.location_id
        INNER JOIN ${this.itemsTable} ON ${this.itemsTable}.item_id = ${this.locationsItemsTable}.item_id
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ILocationItem[]>(query);

    log.info(`Retrieved ${result[0].length} locations items from ${this.locationsItemsTable} table.`);
    log.debug(`Locations Items: ${result[0].map((value) => JSON.stringify(value))}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);

    // Second value in result array holds query metadata that we don't care about.
    return result[0];
  }

  /*
  Select a single location item for the update location item form
  SELECT 
      LI.location_item_id,
      L.location_name AS 'location_name', 
      I.item_name AS 'item_name'
  FROM Locations_Items LI
    INNER JOIN Locations L ON L.location_id = LI.location_id
      INNER JOIN Items L ON L.item_id = LI.item_id
  WHERE LM.location_item_id = :location_item_id_selected_when_clicking_edit_button;
  */
  public static async getLocationItemById(connection: PoolConnection, id: number): Promise<ILocationItem>
  {
    const query: string = `
    SELECT 
      location_item_id,
      location_name,
      item_name

    FROM ${this.locationsItemsTable} 
      INNER JOIN ${this.locationsTable} ON ${this.locationsTable}.location_id = ${this.locationsItemsTable}.location_id
        INNER JOIN ${this.itemsTable} ON ${this.itemsTable}.item_id = ${this.locationsItemsTable}.item_id
    WHERE 
      ${this.locationsItemsTable}.location_item_id = ${id} 
    `;

    log.debug(`Executing Query: ${query}`);

    const result = await connection.execute<ILocationItem[]>(query);

    log.info(`Retrieved location item from ${this.locationsItemsTable} table.`);
    log.debug(`Location Item: ${JSON.stringify(result[0][0])}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
    
    // Second value in result array holds query metadata that we don't care about.
    // Similarly, we only expect to get one result back, so we return first element only.
    return result[0][0];
  }

  /*
  Add a new location item 

  INSERT INTO Locations_Items (
      location_id,
      item_id
  )
  VALUE (
      (SELECT location_id 
      FROM Locations
      WHERE location_name = :location_name_selected_from_dropdown),
      (SELECT item_id 
      FROM Items 
      WHERE item_name = :item_name_selected_from_dropdown)
  );
  */
  public static async addLocationItem(connection: PoolConnection, value: LocationItem): Promise<any> {
    const query: string = `
      INSERT INTO Locations_Items (location_id, item_id)
      VALUES (
        (
          SELECT location_id 
          FROM Locations
          WHERE location_name = ?
        ),
        (
          SELECT item_id 
          FROM Items 
          WHERE item_name = ?
        )
      )
    `;
  
    log.debug(`Preparing to execute query: ${query}`);
  
    const result = await connection.execute(query, [value.location_name, value.item_name]);
  
    log.info(`Inserted new location item into Locations_Items table.`);
    log.debug(`Location Item: ${JSON.stringify(value)}`);
    log.trace(`Query Result: ${JSON.stringify(result)}`);
  
    return result;
  }

  /*
  Update location item 

  UPDATE Locations_Items
  SET
      location_id = (SELECT location_id
                    FROM Locations
                    WHERE location_name = :location_name_selected_from_dropdown),
      item_id = (SELECT item_id 
                FROM Items 
                WHERE item_name = :item_name_selected_from_dropdown)
  WHERE location_item_id = :location_item_id_from_update;
  */
  public static async updateLocationItemById(connection: PoolConnection, value: LocationItem): Promise<any> {

    const query: string = `
      UPDATE ${this.locationsItemsTable}
      SET 
        location_id = (
          SELECT location_id
          FROM ${this.locationsTable}
          WHERE location_name = ?
        ),
        item_id = (
          SELECT item_id
          FROM ${this.itemsTable}
          WHERE item_name = ?
        )
      WHERE location_item_id = ?`;
  
    try {
      const [result] = await connection.execute(query, [value.location_name, value.item_name, value.location_item_id]);
  
      return result;
    } catch (error) {
  
      console.error('Error updating location item by ID:', error);
      throw error; 
    }
  
  }

  /*
  Delete location item 

  DELETE
  FROM Locations_Items
  WHERE location_item_id = :location_item_id_from_table;
  */
  public static async deleteLocationItemById(connection: PoolConnection, id: number): Promise<any> {
   
    const query: string = `
      DELETE
      FROM ${this.locationsItemsTable}
      WHERE ${this.location_item_id} = ?`;
  
    try {
      // Execute query w/ ID as a param
      const [result] = await connection.execute(query, [id]);
      
      log.info(`Deleted location item with ${this.location_item_id} = ${id}.`);
      
      return result;
    } catch (error) {
      // Asserting error is of type Error
      const errorMessage = (error as Error).message;
      log.error(`Error deleting location item by ID: ${errorMessage}`);
      throw error; // Re-throwing the error to handle it further up the call stack if necessary
    }
  }
}