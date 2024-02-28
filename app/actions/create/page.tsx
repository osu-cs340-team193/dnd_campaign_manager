import Form from '@/app/ui/actions/create-form';

import { fetchMonsterNames } from '@/app/lib/data';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Querying from backend adapted from source.
// Page displayed when routing to hostname/actions/create
export default async function Page()
{
  const monsterNames = await fetchMonsterNames();

  return (
    <Form 
      monsterNames={monsterNames}
    />
  );
}