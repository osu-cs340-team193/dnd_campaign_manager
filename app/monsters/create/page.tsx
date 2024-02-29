import { fetchMonsterTypes } from '@/app/lib/data';
import Form from '@/app/ui/monsters/create-form';

// Page displayed when visiting /monsters/create
export default async function Page()
{
  // Query monster types to be displayed in dropdown list of form
  const monsterTypes = await fetchMonsterTypes();

  return (
    <Form 
      monsterTypes={monsterTypes}
    />
  );
}