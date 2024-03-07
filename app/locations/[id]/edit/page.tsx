import 
{ 
  fetchLocationById,
  fetchMonsterNames,
  fetchItemNames,
  fetchCampaignTitles,
  fetchLocationMonsterNamesById,
  fetchLocationItemNamesById
} from '@/app/lib/data';
import Form from '@/app/ui/locations/edit-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when visiting /locations/{id}/edit 
export default async function Page({ params }: { params: { id: number }})
{
  // Query location, monster names, campaign titles, and item names in parallel. 
  const 
  [
    location, 
    campaignTitles, 
    monsterNames, 
    itemNames,
    locationMonsters,
    locationItems,
  ] 
  = 
  await Promise.all
  ([
    fetchLocationById(params.id),
    fetchCampaignTitles(),
    fetchMonsterNames(),
    fetchItemNames(),
    fetchLocationMonsterNamesById(params.id),
    fetchLocationItemNamesById(params.id),
  ]);
  
  return (
    <Form 
      location={location} 
      campaignTitles={campaignTitles}
      monsterNames={monsterNames}
      itemNames={itemNames}
      locationMonsterNames={locationMonsters}
      locationItemNames={locationItems}
    />
  );
}