import {
  fetchLocationMonsterNamesById,
  fetchLocationItemNamesById,
  fetchItemLocationNamesById,
  fetchMonsterLocationNamesById,
  fetchMonsterActionNamesById,
} from '@/app/lib/data';

// Returns a comma-delimited string of monster names for a given location
export async function MonsterNamesByLocationId(id: number)
{
  const monsterNames = await fetchLocationMonsterNamesById(id);
  return monsterNames.map((monsterName) => monsterName.monster_name).join(', ');
}

// Returns a comma-delimited string of item names for a given location
export async function ItemNamesByLocationId(id: number)
{
  const itemNames = await fetchLocationItemNamesById(id);
  return itemNames.map((itemName) => itemName.item_name).join(', ');
}

// Returns a comma-delimited string of location names for a given item 
export async function LocationNamesByItemId(id: number)
{
  const locationNames = await fetchItemLocationNamesById(id);
  return locationNames.map((locationName) => locationName.location_name).join(', ');
}

// Returns a comma-delimited string of location names for a given monster 
export async function LocationNamesByMonsterId(id: number)
{
  const locationNames = await fetchMonsterLocationNamesById(id);
  return locationNames.map((locationName) => locationName.location_name).join(', ');
}

// Returns a comma-delimited string of action names for a given monster 
export async function ActionNamesByMonsterId(id: number)
{
  const actionNames = await fetchMonsterActionNamesById(id);
  return actionNames.map((actionName) => actionName.action_name).join(', ');
}