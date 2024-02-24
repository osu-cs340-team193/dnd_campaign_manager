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

/*************************************
Action: User clicks create button while on the Campaigns page (nothing happens here).
*************************************/

/*************************************
Action: User clicks submit button on Campaigns/create page.
*************************************/

-- Add a new campaign
INSERT INTO Campaigns (title, start_date, end_date, dungeon_master) 
VALUES (:titleInput, :start_date_Input, :end_date_Input, :dungeon_master_Input);

/*************************************
Action: User clicks submit button on Campaigns/{id}/edit page.
*************************************/

-- Update a campaign
UPDATE Campaigns 
SET title = :titleInput, start_date = :start_date_Input, end_date = :end_date_Input, dungeon_master = :dungeon_master_Input
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
SELECT C.title AS "Campaign Name", L.location_name, L.location_description
FROM Locations L
INNER JOIN Campaigns C ON Campaigns.campaign_id = Locations.campaign_id;

/*************************************
Action: User clicks edit button for a given location in the Locations table.
*************************************/

-- Select a single location for the update location form
SELECT *
FROM Locations 
WHERE location_id = :location_id_selected_when_clicking_edit_button;

-- Get all available Campaigns to populate a dropdown for selecting location's associated campaign 
SELECT title 
FROM Campaigns
ORDER BY title ASC;

-- Get all available Monsters to populate a checkbox for selecting location's Monsters 
SELECT monster_name
FROM Monsters 
ORDER BY monster_name ASC;

-- Get all available item to populate a checkbox for selecting location's item 
SELECT item_name
FROM Items 
ORDER BY item_name ASC;

/*************************************
Action: User clicks create button while on the Locations page.
*************************************/

-- Get all available Campaigns to populate a dropdown for selecting location's associated campaign 
SELECT title 
FROM Campaigns
ORDER BY title ASC;

-- Get all available Monsters to populate a checkbox for selecting location's Monsters 
SELECT monster_name
FROM Monsters 
ORDER BY monster_name ASC;

-- Get all available item to populate a checkbox for selecting location's item 
SELECT item_name
FROM Items 
ORDER BY item_name ASC;

/*************************************
Action: User clicks submit button on Locations/create page.
*************************************/

-- Add a new location
INSERT INTO Locations (campaign_id, location_name, location_description)
VALUE (:campaign_id_matching_title_from_Campaigns_dropdown, :location_name_Input, :location_description_Input);

-- Insert into Locations_Monsters intersection table when adding a location (do once for each selected monster)
INSERT INTO Locations_Monsters (lid, mid) 
VALUES (
    (SELECT location_id FROM Locations WHERE location_id = :location_id_from_insert), 
    (SELECT monster_id FROM Monsters WHERE monster_name = :monster_name_from_selected_Monsters_array)
),
-- Repeat for all selected Monsters 

-- Insert into Locations_Items intersection table when adding a location (do once for each selected item)
INSERT INTO Locations_Items (lid, iid) 
VALUES (
    (SELECT location_id FROM Locations WHERE location_id = :location_id_from_insert), 
    (SELECT item_id FROM Items WHERE item_name = :item_name_from_selected_Items_array)
),
-- Repeat for all selected Items

/*************************************
Action: User clicks submit button on Locations/{id}/edit page.
*************************************/

-- Update a location
UPDATE Locations 
SET campaign_id = :campaign_id_from_Campaigns_Dropdown, location_name = :location_name_Input, location_description = :location_description_Input
WHERE location_id = :location_id_from_table;

-- Update Locations_Items intersection table when updating a location (do once for each selected item)
UPDATE Locations_Items
SET 
    lid = (SELECT location_id FROM Locations WHERE location_id = :location_id_from_update),
    iid = (SELECT item_id FROM Items WHERE item_name = :item_name_from_selected_Items_array)
WHERE lid = :location_id_from_update
AND iid = (SELECT item_id FROM Items WHERE item_name = :item_name_from_selected_Items_array);

-- Update Locations_Monsters intersection table when updating a location (do once for each selected monster)
UPDATE Locations_Monsters
SET 
    lid = (SELECT location_id FROM Locations WHERE location_id = :location_id_from_update),
    mid = (SELECT monster_id FROM Monsters WHERE monster_name = :monster_name_from_selected_Monsters_array)
WHERE lid = :location_id_from_update 
AND mid = (SELECT monster_id FROM Monsters WHERE monster_name = :monster_name_from_selected_Monsters_array);

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
INSERT INTO Monsters (monster_name, armor_class, hit_points, monster_type)
VALUE (:monster_name_Input, :armor_class_Input, :hit_point_Input, :monster_type_input)

-- Insert into Locations_Monsters intersection table when adding a location (do once for each selected location)
INSERT INTO Locations_Monsters (lid, mid) 
VALUES (
    (SELECT location_id FROM Locations WHERE location_name = :location_name_from_selected_Locations_array), 
    (SELECT monster_id FROM Monsters WHERE monster_id = :monster_id_from_insert)
),
-- Repeat for all selected Locations 

/*************************************
Action: User clicks submit button on Monsters/{id}/edit page.
*************************************/

-- Update a monster
UPDATE Monsters 
SET monster_name = :monster_name_Input, armor_class = :armor_class_Input, monster_type = :monster_type_Input
WHERE monster_id = :monster_id_from_table;

-- Update Locations_Monsters intersection table when updating a monster (do once for each selected location)
UPDATE Locations_Monsters
SET 
    lid = (SELECT location_id FROM Locations WHERE location_id = :location_name_from_selected_Locations_array),
    mid = (SELECT monster_id FROM Monsters WHERE monster_name = :monster_id_from_update)
WHERE mid = :monster_id_from_update 
AND lid = (SELECT location_id FROM Locations WHERE location_name = :location_name_from_selected_Locations_array);

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
SELECT A.action_name, M.monster_name AS "Monster Name", A.description
FROM Actions A
INNER JOIN Monsters M ON Monsters.monster_id = Actions.monster_id;

/*************************************
Action: User clicks edit button for a given action in the Actions table.
*************************************/

-- Select a single action for the update action form
SELECT *
FROM Actions 
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
INSERT INTO Actions (action_name, monster_name, description)
VALUE (:action_name_Input, :monster_ID_as_name_Dropdown, :description_Input);

/*************************************
Action: User clicks submit button on Actions/{id}/edit page.
*************************************/

-- Update action
UPDATE Actions 
SET action_name = :action_name_Input, monster_name = :monster_ID_as_name_Dropdown, description = :description_Input
WHERE action_id = :action_id_from_table                    

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
INSERT INTO Items (item_name, value, weight)
VALUE (:item_name_Input, :value_Input, :weight_Input)

-- Insert into Locations_Items intersection table when adding an item (do once for each selected location)
INSERT INTO Locations_Items (lid, iid) 
VALUES (
    (SELECT location_id FROM Locations WHERE location_name = :location_name_from_selected_Locations_array), 
    (SELECT item_id FROM Items WHERE item_id = :item_id_from_insert)
),
-- Repeat for all selected Locations 

/*************************************
Action: User clicks submit button on Items/{id}/edit page.
*************************************/

-- Update item
UPDATE Items 
SET item_name = :item_name_Input, value = :value_Input, weight = :weight_Input
WHERE item_id = :item_id_from_table

-- Insert into Locations_Items intersection table when adding an item (do once for each selected location)
UPDATE Locations_Items
SET
    lid = (SELECT location_id FROM Locations WHERE location_name = :location_name_from_selected_Locations_array), 
    iid = (SELECT item_id FROM Items WHERE item_id = :item_id_from_insert)
WHERE iid = :item_id_from_update
AND lid = (SELECT location_id FROM Locations WHERE location_name = :location_name_from_selected_Locations_array);

/*************************************
Action: User clicks delete button for a given item in the Items table.
*************************************/

-- Delete item
DELETE
FROM Items
WHERE item_id = :item_id_from_table

/****************************************************************************************


Locations_Items
(no associated page on UI)


*****************************************************************************************/

-- return all entries from table
SELECT L.location_name AS "Location Name", I.item_name AS "Item Name" 
FROM Locations_Items LI
	INNER JOIN Locations L ON L.location_id = LI.lid
    INNER JOIN Items I ON I.item_id = LI.iid;

-- add a new entry to the table from the Items page in the form of a multi-select drop down of possible location names
INSERT INTO Locations_Items (lid, iid)
VALUES (:location_id_Input, :item_id_Input);

-- delete a record
DELETE FROM Locations_Items
WHERE lid = :location_id_input AND iid = :item_id_input;

/****************************************************************************************


Locations_Monsters
(no associated page on UI)


*****************************************************************************************/

-- return all entries from table in a user friendly manner (using names)
SELECT L.location_name AS "Location Name", M.monster_name AS "Monster Name"
FROM Locations_Monsters LM
	INNER JOIN Locations L ON L.location_id = LM.lid
    INNER JOIN Monsters M ON M.monster_id = LM.mid;

-- add a new entry to the table from the Monsters page in the form of a multi-select drop down of possible location names
INSERT INTO Locations_Monsters (lid, mid)
VALUES (:location_id_Input, :monster_id_Input);

-- delete a record
DELETE FROM Locations_Items
WHERE lid = :location_id_input AND iid = :item_id_input;
