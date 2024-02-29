import 
{ 
  fetchItemNames,
  fetchLocationItemById,
  fetchLocationNames,
} from '@/app/lib/data';
import Form from '@/app/ui/locations-items/edit-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when routing to /locations-items/{id}/edit
export default async function Page({ params }: { params: { id: number }})
{
  // Query location and item names in parallel. Nmaes used for form dropdown.
  const 
  [
    locationItem,
    locationNames, 
    itemNames
  ] 
  = 
  await Promise.all
  ([
    fetchLocationItemById(params.id),
    fetchLocationNames(),
    fetchItemNames(),
  ]);

  return (
    <Form 
      locationItem={locationItem}
      locationNames={locationNames}
      itemNames={itemNames}
    />
  );
}