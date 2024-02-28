import 
{ 
  fetchActionById,
  fetchMonsterNames,
} from '@/app/lib/data';

import Form from '@/app/ui/actions/edit-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function parameters and form querying from backend adapted from source.
// Page displayed when routing to hostname/campaigns/{id}/edit
export default async function Page({ params }: { params: { id: number }})
{
  // Query actions and monster names in parallel. Types used for form dropdown.
  const 
  [
    action, 
    monsterNames
  ] 
  = 
  await Promise.all
  ([
    fetchActionById(params.id),
    fetchMonsterNames()
  ]);

  return (
    <Form 
      action={action} 
      monsterNames={monsterNames}
    />
  );
}