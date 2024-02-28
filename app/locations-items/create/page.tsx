import 
{ 
  fetchItemNames,
  fetchLocationNames,
} from '@/app/lib/data';

import Form from '@/app/ui/locations-items/create-form';

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
    itemNames
  ] 
  = 
  await Promise.all
  ([
    fetchLocationNames(),
    fetchItemNames(),
  ]);

  return (
    <Form 
      locationNames={locationNames}
      itemNames={itemNames}
    />
  );
}