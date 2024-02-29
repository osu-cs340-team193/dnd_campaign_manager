import 
{ 
  fetchItemNames,
  fetchLocationNames,
} from '@/app/lib/data';
import Form from '@/app/ui/locations-items/create-form';

// Page displayed when visiting /locations-items/create 
export default async function Page()
{
  // Query locations and item names in parallel. Names used for form dropdown.
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