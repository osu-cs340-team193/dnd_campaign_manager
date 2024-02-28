import 
{ 
  fetchItemById,
  fetchItemLocationNamesById,
  fetchLocationNames,
} from '@/app/lib/data';

import Form from '@/app/ui/items/edit-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when routing to hostname/items/{id}/edit
export default async function Page({ params }: { params: { id: number }})
{
  // Query items and location names in parallel. Types used for form dropdown.
  const 
  [
    item, 
    locationNames,
    itemLocationNames,
  ] 
  = 
  await Promise.all
  ([
    fetchItemById(params.id),
    fetchLocationNames(),
    fetchItemLocationNamesById(params.id),
  ]);

  return (
    <Form 
      item={item}
      locationNames={locationNames}
      itemLocationNames={itemLocationNames}
    />
  );
}