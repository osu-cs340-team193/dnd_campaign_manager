import 
{ 
  fetchLocationNames,
} from '@/app/lib/data';

import Form from '@/app/ui/items/create-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when routing to hostname/items/create
export default async function Page()
{
  // TODO: Move this to the form instead.
  // Query items and location names in parallel. Types used for form dropdown.
  const 
  [
    locationNames,
  ] 
  = 
  await Promise.all
  ([
    fetchLocationNames(),
  ]);

  return (
    <Form
      locationNames={locationNames}
    />
  );
}