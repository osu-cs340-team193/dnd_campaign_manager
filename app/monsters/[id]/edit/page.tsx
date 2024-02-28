import 
{ 
  fetchMonsterById, 
  fetchMonsterTypes 
} from '@/app/lib/data';

import Form from '@/app/ui/monsters/edit-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when routing to hostname/monsters/{id}/edit
export default async function Page({ params }: { params: { id: number }})
{
  // TODO: Move this to the form instead.
  // Query monster and types in parallel. Types used for form dropdown.
  const 
  [
    monster, 
    monsterTypes
  ] 
  = 
  await Promise.all
  ([
    fetchMonsterById(params.id),
    fetchMonsterTypes()
  ]);

  console.info(`Displaying data for monster with id ${params.id}\n ${JSON.stringify(monster)}`);
  console.info(`Available monster types:\n ${JSON.stringify(monsterTypes)}`);

  return (
    <Form 
      monster={monster} 
      monsterTypes={monsterTypes}
    />
  );
}