import { fetchMonsterById } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: number }})
{
  const monster = await fetchMonsterById(params.id);

  console.log(monster);

  return (
    <div>
      <h1>
        Monster Page # {params.id}
      </h1>
      <p>
        {monster?.monster_name} | {monster?.armor_class} | {monster?.hit_points} | {monster?.monster_type}
      </p>
    </div>
  );
}