import 
{ 
  fetchLocationMonsterById,
  fetchLocationNames,
  fetchMonsterNames,
} from '@/app/lib/data';
import Form from '@/app/ui/locations-monsters/edit-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when visiting /locations-monsters/{id}/edit
export default async function Page({ params }: { params: { id: number }})
{
  // Query monster and location names in parallel. Names used for form dropdown.
  const 
  [
    locationMonster,
    locationNames, 
    monsterNames
  ] 
  = 
  await Promise.all
  ([
    fetchLocationMonsterById(params.id),
    fetchLocationNames(),
    fetchMonsterNames(),
  ]);

  return (
    <Form 
      locationMonster={locationMonster}
      locationNames={locationNames}
      monsterNames={monsterNames}
    />
  );
}