import 
{ 
  fetchLocationNames,
} from '@/app/lib/data';
import Form from '@/app/ui/items/create-form';

// Page displayed when visiting to /items/create
export default async function Page()
{
  // Query location names. Namse used for form dropdown.
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