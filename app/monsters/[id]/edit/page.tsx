import { fetchMonsterById } from "@/app/lib/data";
import EditMonsterForm from "@/app/ui/monsters/edit-form";

export default async function Page({ params }: { params: { id: number }})
{
  const monster = await fetchMonsterById(params.id);

  console.log(monster);

  return (
    <div>
      <h1 className="my-[20px]">
        Edit Monster
      </h1>
      <EditMonsterForm monster={monster} />
    </div>
  );
}