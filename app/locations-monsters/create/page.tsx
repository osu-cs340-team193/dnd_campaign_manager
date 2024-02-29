import 
{ 
  fetchLocationNames,
  fetchMonsterNames,
} from '@/app/lib/data';
import Form from '@/app/ui/locations-monsters/create-form';

// Page displayed when visiting /locations-monsters/create
export default async function Page()
{
  // Query location and monster names in parallel. Names used for form dropdown.
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