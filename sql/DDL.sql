SET FOREIGN_KEY_CHECKS=0;

/*
Drop all existing tables to start with a clean slate
*/
DROP TABLE IF EXISTS Campaigns;
DROP TABLE IF EXISTS Locations;
DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Monsters;
DROP TABLE IF EXISTS Actions;
DROP TABLE IF EXISTS Locations_Items;
DROP TABLE IF EXISTS Locations_Monsters;

/*
Create Campaigns table
*/ 
CREATE TABLE Campaigns (
  campaign_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  title varchar(255) NOT NULL,
  start_date date NOT NULL,
  end_date date,
  dungeon_master varchar(255) NOT NULL,
  PRIMARY KEY (campaign_id)
);

/*
Create Locations table
*/ 
CREATE TABLE Locations (
  location_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  campaign_id int NOT NULL,
  location_name varchar(255) NOT NULL,
  location_description text,
  PRIMARY KEY (location_id),
  CONSTRAINT Locations_fk_1 FOREIGN KEY (campaign_id) REFERENCES Campaigns(campaign_id) ON DELETE CASCADE
);

/*
Create Items table
*/ 
CREATE TABLE Items (
  item_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  item_name varchar(255) NOT NULL,
  value float,
  weight float,
  PRIMARY KEY (item_id)
);

/*
Create Monsters table
*/ 
CREATE TABLE Monsters (
  monster_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  monster_name varchar(255) NOT NULL,
  armor_class int NOT NULL,
  hit_points int NOT NULL,
  monster_type varchar(255) NOT NULL,
  PRIMARY KEY (monster_id)
);

/*
Create Actions table
*/ 
CREATE TABLE Actions (
  action_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  monster_id int, 
  action_name varchar(255) NOT NULL,
  description text,
  PRIMARY KEY (action_id),
  CONSTRAINT Actions_fk_1 FOREIGN KEY (monster_id) REFERENCES Monsters(monster_id) ON DELETE SET NULL
);

/*
Create Locations_Items intersection table
*/ 
CREATE TABLE Locations_Items (
  location_item_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  location_id int,
  item_id int,
  PRIMARY KEY (location_item_id),
  CONSTRAINT Locations_Items_fk_1 FOREIGN KEY (location_id) REFERENCES Locations(location_id) ON DELETE CASCADE,
  CONSTRAINT Locations_Items_fk_2 FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE
);

/*
Create Locations_Monsters intersection table
*/ 
CREATE TABLE Locations_Monsters (
  location_monster_id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  location_id int,
  monster_id int,
  PRIMARY KEY (location_monster_id),
  CONSTRAINT Locations_Monsters_fk_1 FOREIGN KEY (location_id) REFERENCES Locations(location_id) ON DELETE CASCADE,
  CONSTRAINT Locations_Monsters_fk_2 FOREIGN KEY (monster_id) REFERENCES Monsters(monster_id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS=1;

SET FOREIGN_KEY_CHECKS=0;
/*
Populate the Campaigns table
*/ 
INSERT INTO Campaigns (title, start_date, end_date, dungeon_master) VALUES
('A Deep and Creeping Darkness', '2024-01-16', '2024-02-22', 'Marcus'),
('The Price of Beauty', '2022-04-16', '2022-05-12','Liam Braxley'),
('The Joy of Extradimensional Spaces', '2023-03-30', NULL ,'Brennan Lee Mulligan');

/*
Populate the Locations table
*/ 
INSERT INTO Locations (campaign_id, location_name, location_description) VALUES
-- Locations for "A Deep and Creeping Darkness"
(
(SELECT campaign_id FROM Campaigns WHERE title ='A Deep and Creeping Darkness'),
'Chamber of Weeping', 
'Thick, velvety black moss covers every surface of this eight-foot-high chamber. Set into the far wall is a deep alcove.'
),

(
(SELECT campaign_id FROM Campaigns WHERE title ='A Deep and Creeping Darkness'),
'Southern Wing', 
'This tunnel ends at a small chamber that holds worn picks, rusty shovels, and two hand carts filled with debris and rags.'
),

-- Locations for "The Price of Beauty"
(
(SELECT campaign_id FROM Campaigns WHERE title ='The Price of Beauty'),
'Lobby', 
'A large lobby, the air heavy with the scent of fresh lilies. A desk stands at the center of the room, holding neatly piled papers and fresh-cut lilies in a vase.'
),

(
(SELECT campaign_id FROM Campaigns WHERE title ='The Price of Beauty'),
'Ilmar''s Room', 
'A cluttered room whose occupant has been staying here for some time. Clothes and cosmetic products are scattered across the floor and desk.'
),

-- Locations for "The Joy of Extradimensional Spaces"
(
(SELECT campaign_id FROM Campaigns WHERE title ='The Joy of Extradimensional Spaces'),
'Library', 
'Tall shelves filled with books line the walls of this room. Two more shelves run through the middle of the room with a ten-foot-wide aisle between them. Several stacks of books are piled high throughout the room. There are small reading desks with cozy scarlet chairs in the corners.'
),

(
(SELECT campaign_id FROM Campaigns WHERE title ='The Joy of Extradimensional Spaces'),
'Exercise Room', 
'This room contains a battered wooden mannequin and a weapon rack holding staffs and daggers, all lit by indigo-tinted light streaming through a window. The floor is stained and scorched. At the far end of the room, a broom hovers in the air, sweeping the floor by itself!'
);

/*
Populate the Items table
*/ 
INSERT INTO Items (item_name, value, weight) VALUES
('Amulet', 5, 1),
('Chain Shirt', 50, 20),
('Dagger', 2, 1),
('Quarterstaff', 0.2, 4),
('Dart', 0.05, 0.25);

/*
Populate the Monsters table
*/ 
INSERT INTO Monsters (monster_name, armor_class, hit_points, monster_type) VALUES
('Swarm of Bats', 12, 22, 'Diminutive Animal'),
('Meenlock', 15, 31, 'Fey'),
('Cambion', 19, 82, 'Medium Fiend'),
('Swarm of Animated Books', 12, 22, 'Medium Swarm of Tiny Constructs'),
('Animated Broom', 15, 17, 'Small Construct');

/*
Populate the Actions table
*/ 
INSERT INTO Actions (monster_id, action_name, description) VALUES
(
(SELECT monster_id FROM Monsters WHERE monster_name = 'Swarm of Bats'), 
'Bites', 
'Melee Weapon Attack: +4 to hit, reach 0 ft., one creature in the swarm''s space. Hit: 5 (2d4) piercing damage, or 2 (1d4) piercing damage if the swarm has half of its hit points or fewer.'
),

(
(SELECT monster_id FROM Monsters WHERE monster_name = 'Meenlock'), 
'Shadow Teleport (Recharge 5-6).',
'As a bonus action, the meenlock can teleport to an unoccupied space within 30 feet of it, provided that both the space it''s teleporting from and its destination are in dim light or darkness. The destination need not be within line of sight. and its destination are in dim light or darkness. The destination need not be within line of sight.'
),

(
(SELECT monster_id FROM Monsters WHERE monster_name = 'Cambion'),  
'Spear', 
'Melee or Ranged Weapon Attack'
),

(
(SELECT monster_id FROM Monsters WHERE monster_name = 'Cambion'), 
'Fire Ray',
'Range Spell Attack'
),

(
(SELECT monster_id FROM Monsters WHERE monster_name = 'Swarm of Animated Books'), 
'Book Club', 
'Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm''s space. Hit: 6 (2d4 + 1) bludgeoning damage, or 3 (1d4 + 1) bludgeoning damage if the swarm has half its hit points or fewer.'
),

(
(SELECT monster_id FROM Monsters WHERE monster_name = 'Animated Broom'),  
'Multiattack', 
'The broom makes two melee attacks.'
),

(
(SELECT monster_id FROM Monsters WHERE monster_name = 'Animated Broom'),
'Broomstick', 
'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) bludgeoning damage.'
);

/*
Populate the Locations_Items table by reference
*/ 
INSERT INTO Locations_Items (location_id, item_id) VALUES
(
(SELECT location_id FROM Locations WHERE location_name = 'Ilmar''s Room'), 
(SELECT item_id FROM Items WHERE item_name = 'Amulet')
),

(
(SELECT location_id FROM Locations WHERE location_name = 'Ilmar''s Room'), 
(SELECT item_id FROM Items WHERE item_name = 'Chain Shirt')
),

(
(SELECT location_id FROM Locations WHERE location_name = 'Exercise Room'), 
(SELECT item_id FROM Items WHERE item_name = 'Dagger')
),

(
(SELECT location_id FROM Locations WHERE location_name = 'Exercise Room'), 
(SELECT item_id FROM Items WHERE item_name = 'Quarterstaff')
),

(
(SELECT location_id FROM Locations WHERE location_name = 'Exercise Room'), 
(SELECT item_id FROM Items WHERE item_name = 'Dart')
);

/*
Populate the Locations_Monsters table by reference
*/
INSERT INTO Locations_Monsters (location_id, monster_id) VALUES
(
(SELECT location_id FROM Locations WHERE location_name = 'Southern Wing'), 
(SELECT monster_id FROM Monsters WHERE monster_name = 'Swarm of Bats')
),

(
(SELECT location_id FROM Locations WHERE location_name = 'Chamber of Weeping'), 
(SELECT monster_id FROM Monsters WHERE monster_name = 'Meenlock')
),

(
(SELECT location_id FROM Locations WHERE location_name = 'Lobby'), 
(SELECT monster_id FROM Monsters WHERE monster_name = 'Cambion')
),

(
(SELECT location_id FROM Locations WHERE location_name = 'Library'), 
(SELECT monster_id FROM Monsters WHERE monster_name = 'Swarm of Animated Books')
),

(
(SELECT location_id FROM Locations WHERE location_name = 'Exercise Room'), 
(SELECT monster_id FROM Monsters WHERE monster_name = 'Animated Broom')
);

SET FOREIGN_KEY_CHECKS=1;
