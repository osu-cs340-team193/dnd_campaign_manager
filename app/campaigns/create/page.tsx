import Form from '@/app/ui/campaigns/create-form';

import { fetchDungeonMasters } from '@/app/lib/data';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Querying from backend adapted from source.
// Page displayed when routing to hostname/campaigns/create
export default async function Page()
{
  const dungeonMasters = await fetchDungeonMasters();

  return (
    <Form 
      dungeonMasters={dungeonMasters}
    />
  );
}