import { fetchMonsterTypes } from "@/app/lib/data";
import CreateMonsterForm from "@/app/ui/monsters/create-form";

export default async function Page()
{
  const monsterTypes = await fetchMonsterTypes();

  return (
    <div>
      <div>
        New Monster
      </div>
      <CreateMonsterForm 
        monsterTypes={monsterTypes}
      />
    </div>
  );
}