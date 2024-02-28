import 
{ 
  fetchMonsterNames,
  fetchItemNames,
  fetchCampaignTitles,
} from '@/app/lib/data';

import Form from '@/app/ui/locations/create-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when routing to hostname/locations/create
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