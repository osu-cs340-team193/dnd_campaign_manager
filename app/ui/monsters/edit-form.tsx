"use client";

import { updateMonster } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Monster } from "@/app/lib/monsters-entity";
import Link from "next/link";
import Label from "@/app/ui/extensions/label";
import Input from "@/app/ui/extensions/input";
import Button from "@/app/ui/extensions/button";
import Select from '@/app/ui/extensions/select';
import Option from '@/app/ui/extensions/option';
import Form from '@/app/ui/extensions/form';

export default function EditMonsterForm({ monster }: {monster: Monster })
{
  const initialState = { message: null, errors: {}};
  const updateMonsterWithId = updateMonster.bind(null, monster.id ?? -1);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(updateMonsterWithId, initialState);

  return (
    <Form action={dispatch}>
      <Label htmlFor="monster_name" className="mr-[5px]">
        Monster Name:
      </Label>
      <Input id="monster_name" name="monster_name" type="text" className="border" defaultValue={monster.monster_name}/>
      <Label htmlFor="armor_class" className="mr-[5px]">
        Armor Class:
      </Label>
      <Input id="armor_class" name="armor_class" type="number" className="border" defaultValue={monster.armor_class}/>
      <Label htmlFor="hit_points" className="mr-[5px]">
        Hit Points:
      </Label>
      <Input id="hit_points" name="hit_points" type="number" className="border" defaultValue={monster.hit_points}/>
      <Label htmlFor="monster_type" className="mr-[5px]">
        Monster Type
      </Label>
      <Select id="monster_type" name="monster_type" defaultValue={monster.monster_type}>
        <Option value="" disabled>
          Select a monster type
        </Option>
        <Option value="Diminutive Animal">
          Diminutive Animal
        </Option>
      </Select>
      <div>
        <Link href="/monsters">
          Cancel
        </Link>
        <Button type="submit" className="flex h-10 items-center">
          Submit
        </Button>
      </div>
    </Form>
  );
}