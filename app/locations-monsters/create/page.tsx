import 
{ 
  fetchLocationNames,
  fetchMonsterNames,
} from '@/app/lib/data';

import Form from '@/app/ui/locations-monsters/create-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when routing to hostname/campaigns/{id}/edit
export default async function Page()
{
  // Query actions and monster names in parallel. Types used for form dropdown.
  const 
  [
    locationNames, 
    monsterNames
  ] 
  = 
  await Promise.all
  ([
    fetchLocationNames(),
    fetchMonsterNames(),
  ]);

  return (
    <Form 
      locationNames={locationNames}
      monsterNames={monsterNames}
    />
  );
}