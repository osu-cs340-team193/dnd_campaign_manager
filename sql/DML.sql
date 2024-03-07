/* 
Students: Colby McGrath, Mohamed Al-Hussein, and Owen Summersett
Course: CS340 - Group 193
Assignment: DML SQL for Project Step 3
Code Citations: The code sections within this file uses code from https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325 as the skeleton code.
Code has been changed to reflect the realities of the entities within our project. 
*/

/****************************************************************************************


Campaigns


*****************************************************************************************/

/*************************************
Action: User visits Campaigns page
*************************************/

-- Retrieve all Campaigns entries
SELECT * 
FROM Campaigns; 

/*************************************
Action: User clicks edit button for a given campaign in the Campaigns table.
*************************************/

-- Select a single campaign for the update campaign form
SELECT *
FROM Campaigns
WHERE campaign_id = :campaign_id_selected_when_clicking_edit_button;

-- Get all available dungeon masters to populate a dropdown for selecting Campaign's dungeon master
SELECT DISTINCT dungeon_master 
FROM Campaigns 
ORDER BY dungeon_master ASC;

/*************************************
Action: User clicks create button while on the Campaigns page.
*************************************/

-- Get all available dungeon masters to populate a dropdown for selecting Campaign's dungeon master
SELECT DISTINCT dungeon_master 
FROM Campaigns 
ORDER BY dungeon_master ASC;

/*************************************
Action: User clicks submit button on Campaigns/create page.
*************************************/

-- Add a new campaign
INSERT INTO Campaigns (
    title, 
    start_date, 
    end_date, 
    dungeon_master
) 
VALUES (
    :titleInput, 
    :start_date_Input, 
    :end_date_Input, 
    :dungeon_master_Input
);

/*************************************
Action: User clicks submit button on Campaigns/{id}/edit page.
*************************************/

-- Update a campaign
UPDATE Campaigns 
SET 
    title = :titleInput, 
    start_date = :start_date_Input, 
    end_date = :end_date_Input, 
    dungeon_master = :dungeon_master_Input
WHERE campaign_id = :campaign_id_from_table;

/*************************************
Action: User clicks delete button for a given campaign in the Campaigns table.
*************************************/

-- Delete a campaign
DELETE 
FROM Campaigns
WHERE campaign_id = :campaign_id_from_table;

/****************************************************************************************


Locations


*****************************************************************************************/

/*************************************
Action: User visits Locations page.
*************************************/

-- Retrieve all Locations entries and join to show the relevant campaign name instead of the title
SELECT 
    C.title AS 'campaign_name', 
    L.location_name, 
    L.location_description
FROM Locations L
INNER JOIN Campaigns C ON Campaigns.campaign_id = Locations.campaign_id;

-- Get all monster names for each location
SELECT 
    M.monster_name AS 'monster_name'
FROM Locations_Monsters LM
    INNER JOIN Locations L ON L.location_id = LM.location_id
    INNER JOIN Monsters M ON M.monster_id = LM.monster_id
WHERE L.location_id = :location_id_for_row_in_table;
-- Repeat for all rows 

-- Get all item names for each location
SELECT 
    I.item_name AS 'item_name'
FROM Locations_Items LI
    INNER JOIN Locations L ON L.location_id = LI.location_id
    INNER JOIN Items I ON I.item_id = LI.item_id
WHERE L.location_id = :location_id_for_row_in_table;
-- Repeat for all rows 

/*************************************
Action: User clicks edit button for a given location in the Locations table.
*************************************/

-- Select a single location for the update location form and join to show the relevant campaign name instead of the title
SELECT 
    C.title AS 'campaign_name',
    L.locatin_name,
    L.location_description
FROM Locations L
INNER JOIN Campaigns C ON Campaigns.campaign_id = Locations.campaign_id
WHERE location_id = :location_id_selected_when_clicking_edit_button;

-- Get all available Campaigns to populate a dropdown for selecting location's associated campaign 
SELECT DISTINCT title 
FROM Campaigns
ORDER BY title ASC;

-- Get all available Monsters to populate a checkbox for selecting location's Monsters 
SELECT DISTINCT monster_name
FROM Monsters 
ORDER BY monster_name ASC;

-- Get all available item to populate a checkbox for selecting location's item 
SELECT DISTINCT item_name
FROM Items 
ORDER BY item_name ASC;

-- Get all monsters for this location with user friendly names
SELECT 
    M.monster_name AS 'monster_name'
FROM Locations_Monsters LM
	INNER JOIN Locations L ON L.location_id = LM.location_id
    INNER JOIN Monsters M ON M.monster_id = LM.monster_id
WHERE L.location_id = :location_id_selected_when_clicking_edit_button;

-- Get all items for this location with user friendly names
SELECT 
    I.item_name AS 'item_name'
FROM Locations_Items LI
	INNER JOIN Locations L ON L.location_id = LI.location_id
    INNER JOIN Items I ON I.item_id = LI.item_id
WHERE L.location_id = :location_id_selected_when_clicking_edit_button;

/*************************************
Action: User clicks create button while on the Locations page.
*************************************/

-- Get all available Campaigns to populate a dropdown for selecting location's associated campaign 
SELECT DISTINCT title 
FROM Campaigns
ORDER BY title ASC;

-- Get all available Monsters to populate a checkbox for selecting location's Monsters 
SELECT DISTINCT monster_name
FROM Monsters 
ORDER BY monster_name ASC;

-- Get all available item to populate a checkbox for selecting location's item 
SELECT DISTINCT item_name
FROM Items 
ORDER BY item_name ASC;

/*************************************
Action: User clicks submit button on Locations/create page.
*************************************/

-- Add a new location
INSERT INTO Locations (
    campaign_id, 
    location_name, 
    location_description
)
VALUE (
    :campaign_id_matching_title_from_Campaigns_dropdown, 
    :location_name_Input, 
    :location_description_Input
);

-- Insert into Locations_Monsters intersection table when adding a location (do once for each selected monster)
INSERT INTO Locations_Monsters (
    location_id, monster_id
) 
VALUES (
    (SELECT location_id FROM Locations 
     WHERE location_id = :location_id_from_insert), 
    (SELECT monster_id FROM Monsters 
     WHERE monster_name = :monster_name_from_selected_Monsters_array)
),
-- Repeat for all selected Monsters 

-- Insert into Locations_Items intersection table when adding a location (do once for each selected item)
INSERT INTO Locations_Items (
    location_id, 
    item_id
) 
VALUES (
    (SELECT location_id FROM Locations 
     WHERE location_id = :location_id_from_insert), 
    (SELECT item_id FROM Items 
     WHERE item_name = :item_name_from_selected_Items_array)
),
-- Repeat for all selected Items

/*************************************
Action: User clicks submit button on Locations/{id}/edit page.
*************************************/

-- Update a location
UPDATE Locations 
SET 
    campaign_id = (SELECT campaign_id 
	          FROM campaignsTable 
	          WHERE title = :valueCampaignName), 
    location_name = :location_name_Input, 
    location_description = :location_description_Input
WHERE location_id = :location_id_from_table;

-- Update Locations_Items intersection table when updating a location (do once for each selected item)
UPDATE Locations_Items
SET 
    location_id = (SELECT location_id FROM Locations 
           WHERE location_id = :location_id_from_update),
    item_id = (SELECT item_id FROM Items 
           WHERE item_name = :item_name_from_selected_Items_array)
WHERE location_id = :location_id_from_update
AND item_id = (SELECT item_id FROM Items 
           WHERE item_name = :item_name_from_selected_Items_array);

-- Update Locations_Monsters intersection table when updating a location (do once for each selected monster)
UPDATE Locations_Monsters
SET 
    location_id = (SELECT location_id FROM Locations 
           WHERE location_id = :location_id_from_update),
    monster_id = (SELECT monster_id FROM Monsters 
           WHERE monster_name = :monster_name_from_selected_Monsters_array)
WHERE location_id = :location_id_from_update 
AND monster_id = (SELECT monster_id FROM Monsters 
           WHERE monster_name = :monster_name_from_selected_Monsters_array);

/*************************************
Action: User clicks delete button for a given location in the Locations table.
*************************************/

-- Delete location
DELETE
FROM Locations
WHERE location_id = :location_id_from_table;

/****************************************************************************************


Monsters


*****************************************************************************************/

/*************************************
Action: User visits Monsters page.
*************************************/

-- Retrieve all Monsters entries
SELECT *
FROM Monsters;

-- Get all location names each monster
SELECT
    L.location_name AS 'location_name'
FROM Locations_Monsters LM
    INNER JOIN Locations L ON L.location_id = LM.location_id
    INNER JOIN Monsters M ON M.monster_id = LM.monster_id
WHERE M.monster_id = :monster_id_for_row_in_table
-- Repeat for all rows 

-- Get all action names for each monster
SELECT
    A.action_name AS 'action_name'
FROM Actions A 
    INNER JOIN Monsters M ON M.monster_id = A.monster_id
WHERE M.monster_id = :monster_id_for_row_in_table;
-- Repeat for all rows

/*************************************
Action: User clicks edit button for a given monster in the Monsters table.
*************************************/

-- Select a single monster for the update monster form
SELECT *
FROM Monsters 
WHERE monster_id = :monster_id_selected_when_clicking_edit_button;

-- Get all available monster types to populate a dropdown for selecting Monsters's associated type 
SELECT DISTINCT monster_type
FROM Monsters
ORDER BY monster_type ASC;

-- Get all available Locations to populate a checkbox for selecting monster's Locations 
SELECT location_name 
FROM Locations 
ORDER BY location_name ASC;

/*************************************
Action: User clicks create button while on the Monsters page.
*************************************/

-- Get all available monster types to populate a dropdown for selecting Monsters's associated type 
SELECT DISTINCT monster_type
FROM Monsters
ORDER BY monster_type ASC;

-- Get all available Locations to populate a checkbox for selecting monster's Locations 
SELECT location_name 
FROM Locations 
ORDER BY location_name ASC;

/*************************************
Action: User clicks submit button on Monsters/create page.
*************************************/

-- Add a new monster
INSERT INTO Monsters (
    monster_name, 
    armor_class, 
    hit_points, 
    monster_type
)
VALUE (
    :monster_name_Input, 
    :armor_class_Input, 
    :hit_points_Input, 
    :monster_type_Input
);

-- Insert into Locations_Monsters intersection table when adding a location (do once for each selected location)
INSERT INTO Locations_Monsters (
    location_id,
    monster_id
) 
VALUES (
    (SELECT location_id FROM Locations WHERE location_name = :location_name_from_selected_Locations_array), 
    (SELECT monster_id FROM Monsters WHERE monster_id = :monster_id_from_insert)
),
-- Repeat for all selected Locations 

/*************************************
Action: User clicks submit button on monsters/{id}/edit page.
*************************************/

-- Update a monster
UPDATE Monsters 
SET 
    monster_name = :monster_name_Input, 
    armor_class = :armor_class_Input, 
    hit_points = :hit_points_Input,
    monster_type = :monster_type_Input
WHERE monster_id = :monster_id_from_table;

-- Update Locations_Monsters intersection table when updating a monster (do once for each selected location)
UPDATE Locations_Monsters
SET 
    location_id = (SELECT location_id FROM Locations WHERE location_id = :location_name_from_selected_Locations_array),
    monster_id = (SELECT monster_id FROM Monsters WHERE monster_name = :monster_id_from_update)
WHERE monster_id = :monster_id_from_update 
AND location_id = (SELECT location_id FROM Locations WHERE location_name = :location_name_from_selected_Locations_array);

/*************************************
Action: User clicks delete button for a given monster in the Monsters table.
*************************************/

-- Delete monster
DELETE 
FROM Monsters
WHERE monster_id = :monster_id_from_table

/****************************************************************************************


Actions


*****************************************************************************************/

/*************************************
Action: User visits Actions page.
*************************************/

-- Retrieve all Actions
SELECT 
    A.action_name, 
    M.monster_name AS 'monster_name', 
    A.description
FROM Actions A
INNER JOIN Monsters M ON Monsters.monster_id = Actions.monster_id;

/*************************************
Action: User clicks edit button for a given action in the Actions table.
*************************************/

-- Select a single action for the update action form
SELECT 
    A.action_name, 
    M.monster_name AS 'monster_name', 
    A.description
FROM Actions A
INNER JOIN Monsters M ON Monsters.monster_id = Actions.monster_id
WHERE action_id = :action_id_selected_when_clicking_edit_button;


-- Get all available Monsters to populate a dropdown for selecting action's associated monster 
SELECT monster_name
FROM Monsters
ORDER BY monster_name ASC;

/*************************************
Action: User clicks create button while on the Actions page.
*************************************/

-- Get all available Monsters to populate a dropdown for selecting action's associated monster 
SELECT monster_name
FROM Monsters
ORDER BY monster_name ASC;

/*************************************
Action: User clicks submit button on Actions/create page.
*************************************/

-- Add a new action
INSERT INTO Actions (
    action_name, 
    monster_name, 
    description
)
VALUE (
    :action_name_Input, 
    :(SELECT monster_id FROM Monsters 
      WHERE monster_name = :monster_name_from_dropdown),
    :description_Input
);

/*************************************
Action: User clicks submit button on Actions/{id}/edit page.
*************************************/

-- Update action
UPDATE Actions 
SET 
    action_name = :action_name_Input, 
    monster_id = (SELECT monster_id FROM Monsters 
                  WHERE monster_name = :monster_name_from_dropdown),
    description = :description_Input
WHERE action_id = :action_id_from_table;

/*************************************
Action: User clicks delete button for a given action in the Actions table.
*************************************/

-- Delete action
DELETE 
FROM Actions
WHERE action_id = :action_id_from_table
                    
/****************************************************************************************


Items


*****************************************************************************************/

/*************************************
Action: User visits Items page.
*************************************/

-- Retrive all Items
SELECT *
FROM Items;

-- Get all location names for each item
SELECT 
    L.location_name AS 'location_name'
FROM Locations_Items LI
    INNER JOIN Locations L ON L.location_id = LI.location_id
    INNER JOIN Items I ON I.item_id = LI.item_id
WHERE I.item_id = :item_id_for_row_in_table;
-- Repeat for all rows

/*************************************
Action: User clicks edit button for a given item in the Items table.
*************************************/

-- Select a single item for the update item form
SELECT *
FROM Items 
WHERE item_id = :item_id_selected_when_clicking_edit_button;

-- Get all available Locations to populate a checkbox for selecting item's Locations 
SELECT location_name 
FROM Locations 
ORDER BY location_name ASC;

/*************************************
Action: User clicks create button while on the Items page.
*************************************/

-- Get all available Locations to populate a checkbox for selecting item's Locations 
SELECT location_name 
FROM Locations 
ORDER BY location_name ASC;

/*************************************
Action: User clicks submit button on Items/create page.
*************************************/

-- Add a new item
INSERT INTO Items (
    item_name, 
    value, 
    weight
)
VALUE (
    :item_name_Input, 
    :value_Input, 
    :weight_Input
)

-- Insert into Locations_Items intersection table when adding an item (do once for each selected location)
INSERT INTO Locations_Items (
    location_id, 
    item_id
) 
VALUES (
    (SELECT location_id FROM Locations 
     WHERE location_name = :location_name_from_selected_Locations_array), 
    (SELECT item_id FROM Items 
     WHERE item_id = :item_id_from_insert)
),
-- Repeat for all selected Locations 

/*************************************
Action: User clicks submit button on Items/{id}/edit page.
*************************************/

-- Update item
UPDATE Items 
SET 
    item_name = :item_name_Input, 
    value = :value_Input, 
    weight = :weight_Input
WHERE item_id = :item_id_from_table;

-- Insert into Locations_Items intersection table when adding an item (do once for each selected location)
UPDATE Locations_Items
SET
    location_id = (SELECT location_id FROM Locations 
           WHERE location_name = :location_name_from_selected_Locations_array), 
    item_id = (SELECT item_id FROM Items 
           WHERE item_id = :item_id_from_insert)
WHERE item_id = :item_id_from_update
AND location_id = (SELECT location_id FROM Locations 
           WHERE location_name = :location_name_from_selected_Locations_array);

/*************************************
Action: User clicks delete button for a given item in the Items table.
*************************************/

-- Delete item
DELETE
FROM Items
WHERE item_id = :item_id_from_table;

/****************************************************************************************


Locations_Items
(no associated page on UI)


*****************************************************************************************/

-- return all entries from table
SELECT L.location_name AS "Location Name", I.item_name AS "Item Name" 
FROM Locations_Items LI
	INNER JOIN Locations L ON L.location_id = LI.location_id
    INNER JOIN Items I ON I.item_id = LI.item_id;

-- add a new entry to the table from the Items page in the form of a multi-select drop down of possible location names
INSERT INTO Locations_Items (location_id, item_id)
VALUES (:location_id_Input, :item_id_Input);

-- delete a record
DELETE FROM Locations_Items
WHERE location_id = :location_id_input AND item_id = :item_id_input;

/****************************************************************************************


Locations_Monsters


*****************************************************************************************/

/*************************************
Action: User visits Locations Monsters page.
*************************************/

-- return all entries from table in a user friendly manner (using names)
SELECT 
    LM.location_monster_id,
    L.location_name AS 'location_name', 
    M.monster_name AS 'monster_name'
FROM Locations_Monsters LM
	INNER JOIN Locations L ON L.location_id = LM.location_id
    INNER JOIN Monsters M ON M.monster_id = LM.monster_id;

/*************************************
Action: User clicks edit button for a given location monster in the Locations Monsters table.
*************************************/

-- Select a single location monster for the update location monster form
SELECT 
    LM.location_monster_id,
    L.location_name AS 'location_name', 
    M.monster_name AS 'monster_name'
FROM Locations_Monsters LM
	INNER JOIN Locations L ON L.location_id = LM.location_id
    INNER JOIN Monsters M ON M.monster_id = LM.monster_id
WHERE LM.location_monster_id = :location_monster_id_selected_when_clicking_edit_button;

-- Get all available location names to populate a dropdown for selecting location 
SELECT DISTINCT location_name 
FROM Locations 
ORDER BY location_name ASC;

-- Get all available monster names to populate a dropdown for selecting monster
SELECT DISTINCT monster_name
FROM Monsters
ORDER BY monster_name ASC;

/*************************************
Action: User clicks create button while on the Locations Monsters page.
*************************************/

-- Get all available location names to populate a dropdown for selecting location 
SELECT DISTINCT location_name 
FROM Locations 
ORDER BY location_name ASC;

-- Get all available monster names to populate a dropdown for selecting monster
SELECT DISTINCT monster_name
FROM Monsters
ORDER BY monster_name ASC;

/*************************************
Action: User clicks submit button on locations-monsters/create page.
*************************************/

-- Add a new location monster
INSERT INTO Locations_Monsters (
    location_id,
    monster_id
)
VALUE (
    (SELECT location_id 
     FROM Locations
     WHERE location_name = :location_name_selected_from_dropdown),
    (SELECT monster_id 
     FROM Monsters 
     WHERE monster_name = :monster_name_selected_from_dropdown)
);

/*************************************
Action: User clicks submit button on locations-monsters/{id}/edit page.
*************************************/

-- Update location monster
UPDATE Locations_Monsters
SET
    location_id = (SELECT location_id
                   FROM Locations
                   WHERE location_name = :location_name_selected_from_dropdown),
    monster_id = (SELECT monster_id
                   FROM Monsters 
                   WHERE monster_name = :monster_name_selected_from_dropdown)
WHERE location_monster_id = :location_monster_id_from_update;

/*************************************
Action: User clicks delete button for a given location monster in the Locations Monsters table.
*************************************/

-- Delete location monster
DELETE
FROM Locations_Monsters
WHERE location_monster_id = :location_monster_id_from_table;

/****************************************************************************************


Locations_Items


*****************************************************************************************/

/*************************************
Action: User visits Locations Items page.
*************************************/

-- return all entries from table in a user friendly manner (using names)
SELECT 
    LI.location_item_id,
    L.location_name AS 'location_name', 
    I.item_name AS 'item_name'
FROM Locations_Items LI
	INNER JOIN Locations L ON L.location_id = LI.location_id
    INNER JOIN Items I ON I.item_id = LI.item_id;

/*************************************
Action: User clicks edit button for a given location item in the Locations Items table.
*************************************/

-- Select a single location item for the update location item form
SELECT 
    LI.location_item_id,
    L.location_name AS 'location_name', 
    I.item_name AS 'item_name'
FROM Locations_Items LI
	INNER JOIN Locations L ON L.location_id = LI.location_id
    INNER JOIN Items L ON L.item_id = LI.item_id
WHERE LM.location_item_id = :location_item_id_selected_when_clicking_edit_button;

-- Get all available location names to populate a dropdown for selecting location 
SELECT DISTINCT location_name 
FROM Locations 
ORDER BY location_name ASC;

-- Get all available item names to populate a dropdown for selecting item 
SELECT DISTINCT item_name 
FROM Items 
ORDER BY item_name ASC;

/*************************************
Action: User clicks create button while on the Locations Items page.
*************************************/

-- Get all available location names to populate a dropdown for selecting location 
SELECT DISTINCT location_name 
FROM Locations 
ORDER BY location_name ASC;

-- Get all available item names to populate a dropdown for selecting item 
SELECT DISTINCT item_name 
FROM Items 
ORDER BY item_name ASC;

/*************************************
Action: User clicks submit button on locations-items/create page.
*************************************/

-- Add a new location item 
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

/*************************************
Action: User clicks submit button on locations-items/{id}/edit page.
*************************************/

-- Update location item 
UPDATE Locations_Items
SET
    location_id = (SELECT location_id
                   FROM Locations
                   WHERE location_name = :location_name_selected_from_dropdown),
    item_id = (SELECT item_id 
               FROM Items 
               WHERE item_name = :item_name_selected_from_dropdown)
WHERE location_item_id = :location_item_id_from_update;

/*************************************
Action: User clicks delete button for a given location item in the Locations Items table.
*************************************/

-- Delete location item 
DELETE
FROM Locations_Items
WHERE location_item_id = :location_item_id_from_table;
