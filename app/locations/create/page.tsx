import 
{ 
  fetchMonsterNames,
  fetchItemNames,
  fetchCampaignTitles,
} from '@/app/lib/data';
import Form from '@/app/ui/locations/create-form';

// Page displayed when visiting /locations/create
export default async function Page()
{
  // Query location, monster names, campaign titles, and item names in parallel. 
  const 
  [
    campaignTitles, 
    monsterNames, 
    itemNames,
  ] 
  = 
  await Promise.all
  ([
    fetchCampaignTitles(),
    fetchMonsterNames(),
    fetchItemNames(),
  ]);

  return (
    <Form 
      campaignTitles={campaignTitles}
      monsterNames={monsterNames}
      itemNames={itemNames}
    />
  );
}