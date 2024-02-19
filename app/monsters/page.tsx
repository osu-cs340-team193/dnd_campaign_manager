import { fetchMonsters } from "@/app/lib/data";
import Link from "next/link";
import { deleteMonster } from "../lib/actions";
import { DeleteMonster } from "../ui/monsters/buttons";

export default async function Page()
{ 
  const monsters = await fetchMonsters();

  return (
    <>
      <Link
        href={"/monsters/create"}
      >
        New
      </Link>
      <div>
        {monsters?.map((monster) =>
        <div key={monster.id}>
          <Link
            href={`/monsters/${monster.id}/edit`}
          >
            Edit
          </Link>
          <DeleteMonster id={monster.id}/>
          <p>
            {monster.monster_name} | {monster.armor_class} | {monster.hit_points} | {monster.monster_type}
          </p>
        </div>
        )}
      </div>
    </>
  );
}