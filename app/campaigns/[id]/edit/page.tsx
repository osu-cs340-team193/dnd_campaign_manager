import 
{ 
  fetchCampaignById,
  fetchDungeonMasters,
} from '@/app/lib/data';

import Form from '@/app/ui/campaigns/edit-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when routing to hostname/campaigns/{id}/edit
export default async function Page({ params }: { params: { id: number }})
{
  // Query campaign and dungeon masters in parallel. Types used for form dropdown.
  const 
  [
    campaign, 
    dungeonMasters
  ] 
  = 
  await Promise.all
  ([
    fetchCampaignById(params.id),
    fetchDungeonMasters()
  ]);

  return (
    <Form 
      campaign={campaign} 
      dungeonMasters={dungeonMasters}
    />
  );
}