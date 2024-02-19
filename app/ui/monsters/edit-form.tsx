"use client";

import { updateMonster, MonsterFormState } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Monster } from "@/app/lib/monsters-entity";
import Link from "next/link";

export default function EditMonsterForm({ monster }: {monster: Monster })
{
  const initialState = { message: null, errors: {}};
  const updateMonsterWithId = updateMonster.bind(null, monster.id ?? -1);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(updateMonsterWithId, initialState);

  return (
    <form action={dispatch}>
      <label htmlFor="monster_name" className="mr-[5px]">
        Monster Name:
      </label>
      <input id="monster_name" name="monster_name" type="text" className="border" defaultValue={monster.monster_name}/>
      <label htmlFor="armor_class" className="mr-[5px]">
        Armor Class:
      </label>
      <input id="armor_class" name="armor_class" type="number" className="border" defaultValue={monster.armor_class}/>
      <label htmlFor="hit_points" className="mr-[5px]">
        Hit Points:
      </label>
      <input id="hit_points" name="hit_points" type="number" className="border" defaultValue={monster.hit_points}/>
      <label htmlFor="monster_type" className="mr-[5px]">
        Monster Type
      </label>
      <select id="monster_type" name="monster_type" defaultValue={monster.monster_type}>
        <option value="" disabled>
          Select a monster type
        </option>
        <option value="Diminutive Animal">
          Diminutive Animal
        </option>
      </select>
      <div>
        <Link href="/monsters">
          Cancel
        </Link>
        <button type="submit" className="flex h-10 items-center">
          Submit
        </button>
      </div>
    </form>
  );
}