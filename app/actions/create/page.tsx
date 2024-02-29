import Form from '@/app/ui/actions/create-form';
import { fetchMonsterNames } from '@/app/lib/data';

// Page displayed when visiting to /actions/create
export default async function Page()
{
  // Query monster names to be displayed in dropdown list of form
  const monsterNames = await fetchMonsterNames();

  return (
    <Form 
      monsterNames={monsterNames}
    />
  );
}