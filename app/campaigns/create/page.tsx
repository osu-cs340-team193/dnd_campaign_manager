import Form from '@/app/ui/campaigns/create-form';
import { fetchDungeonMasters } from '@/app/lib/data';

// Page displayed when visiting /campaigns/create
export default async function Page()
{
  // Query dungeon masters to be displayed in dropdown list of form
  const dungeonMasters = await fetchDungeonMasters();

  return (
    <Form 
      dungeonMasters={dungeonMasters}
    />
  );
}