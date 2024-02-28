import { fetchMonsterTypes } from '@/app/lib/data';
import Form from '@/app/ui/monsters/create-form';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Querying from backend adapted from source.
// Page displayed when routing to hostname/monsters/create
export default async function Page()
{
  // TODO: Move this to the form instead.
  // Query monster types to be displayed in dropdown list of form.
  const monsterTypes = await fetchMonsterTypes();

  return (
    <Form 
      monsterTypes={monsterTypes}
    />
  );
}