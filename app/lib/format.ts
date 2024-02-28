import {
  fetchLocationMonsterNamesById,
  fetchLocationItemNamesById,
  fetchItemLocationNamesById,
} from '@/app/lib/data';

export async function GetFormattedMonsterNamesByLocationId(id: number)
{
  const monsterNames = await fetchLocationMonsterNamesById(id);
  return monsterNames.map((monsterName) => monsterName.monster_name).join(', ');
}

export async function GetFormattedItemNamesByLocationId(id: number)
{
  const itemNames = await fetchLocationItemNamesById(id);
  return itemNames.map((itemName) => itemName.item_name).join(', ');
}

export async function GetFormattedLocationNamesByItemId(id: number)
{
  const locationNames = await fetchItemLocationNamesById(id);
  return locationNames.map((locationName) => locationName.location_name).join(', ');
}