import { fetchMonsterById, fetchMonsterTypes } from "@/app/lib/data";
import EditMonsterForm from "@/app/ui/monsters/edit-form";

export default async function Page({ params }: { params: { id: number }})
{
  const monster = await fetchMonsterById(params.id);
  const monsterTypes = await fetchMonsterTypes();

  console.log(monster);

  return (
    <div
      className=''
    >
      <h1 className="my-[15px] text-center text-lg">
        Edit Monster
      </h1>
      <EditMonsterForm 
        monster={monster} 
        monsterTypes={monsterTypes}
      />
    </div>
  );
}