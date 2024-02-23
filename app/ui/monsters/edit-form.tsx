"use client";

import { updateMonster } from "@/app/lib/actions/monster";
import { useFormState } from "react-dom";
import { IMonsterType, Monster } from "@/app/lib/entities/monsters-entity";
import Link from "next/link";
import Label from "@/app/ui/extensions/label";
import Input from "@/app/ui/extensions/input";
import Button from "@/app/ui/extensions/button";
import Select from '@/app/ui/extensions/select';
import Option from '@/app/ui/extensions/option';
import Form from '@/app/ui/extensions/form';
import Datalist from "@/app/ui/extensions/datalist";

export default function EditMonsterForm({ monster, monsterTypes }: { monster: Monster, monsterTypes: IMonsterType[] })
{
  const initialState = { message: null, errors: {}};
  const updateMonsterWithId = updateMonster.bind(null, monster?.monster_id ?? -1);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(updateMonsterWithId, initialState);

  return (
    <Form 
      action={dispatch} 
      className='flex flex-col min-w-[500px] border-dashed border-[2px] p-[10px]'
      aria-describedby='monsterFormError'
    >
      <div
        className='flex flex-row items-center my-2'
      >
        <Label 
          htmlFor="monster_name" 
          className='mx-[10px] p-[5px] text-purple-900 align-middle flex-1'
          aria-describedby='monsterNameError'
        >
          Monster Name
        </Label>
        <Input
          id="monster_name" 
          name="monster_name" 
          type="text" 
          className='p-[2px] border-double border-[5px] text-sm flex-grow' 
          defaultValue={monster?.monster_name}
        />
      </div>
      <div
        id='monsterNameError'
        aria-live='polite'
        aria-atomic='true'
      >
        {
          state.errors?.monster_name  && 
          state.errors.monster_name.map((error: string) => 
          (
            <p
              className='mt-2 text-sm text-red-500'
              key={error}
            >
              {error}
            </p>
          ))
        }
      </div>
      <div
        className='flex flex-row items-center my-2'
      >
        <Label 
          htmlFor="armor_class" 
          className='mx-[10px] p-[5px] text-purple-900 align-middle flex-1'
          aria-describedby='armorClassError'
        >
          Armor Class
        </Label>
        <Input 
          id="armor_class" 
          name="armor_class" 
          type="number" 
          className='p-[2px] border-double border-[5px] text-sm w-[100px]' 
          defaultValue={monster?.armor_class}
        />
      </div>
      <div
        id='armorClassError'
        aria-live='polite'
        aria-atomic='true'
      >
        {
          state.errors?.armor_class && 
          state.errors.armor_class.map((error: string) => 
          (
            <p
              className='mt-2 text-sm text-red-500'
              key={error}
            >
              {error}
            </p>
          ))
        }
      </div>
      <div
        className='flex flex-row items-center my-2'
      >
        <Label 
          htmlFor="hit_points" 
          className='mx-[10px] p-[5px] text-purple-900 align-middle flex-1'
          aria-describedby='hitPointsError'
        >
          Hit Points
        </Label>
        <Input 
          id="hit_points" 
          name="hit_points" 
          type="number" 
          className='p-[2px] border-double border-[5px] text-sm w-[100px]' 
          defaultValue={monster?.hit_points}
        />
      </div>
      <div
        id='hitPointsError'
        aria-live='polite'
        aria-atomic='true'
      >
        {
          state.errors?.hit_points && 
          state.errors.hit_points.map((error: string) => 
          (
            <p
              className='mt-2 text-sm text-red-500'
              key={error}
            >
              {error}
            </p>
          ))
        }
      </div>
      <div
        className='flex flex-row items-center my-2'
      >
        <Label 
          htmlFor="monster_type" 
          className='mx-[10px] p-[5px] text-purple-900 align-middle flex-1'
          aria-describedby='monsterTypeError'
        >
          Monster Type
        </Label>
        <Input 
          list='monsterType' 
          id='monster_type'
          name='monster_type'
          type='text'
          className='p-[2px] border-double border-[5px] text-sm w-[200px]' 
          defaultValue={monster?.monster_type}
        />
        <Datalist
          id='monsterType'
          className='p-[2px] border-double border-[5px] text-sm w-[200px]' 
        >
          {
            monsterTypes?.map((monsterType) =>
            (
              <Option
                value={monsterType.monster_type}
                key={monsterType.monster_type}
              />
            ))
          }
        </Datalist>
      </div>
      <div
        id='monsterTypeError'
        aria-live='polite'
        aria-atomic='true'
      >
        {
          state.errors?.monster_type && 
          state.errors.monster_type.map((error: string) => 
          (
            <p
              className='mt-2 text-sm text-red-500'
              key={error}
            >
              {error}
            </p>
          ))
        }
      </div>
      <div
        id='monsterFormError'
        aria-live='polite'
        aria-atomic='true'
      >
        {
          state.message?
          (
            <p
              className='mt-2 text-sm text-red-500'
            >
              {state.message}
            </p>
          ) : null
        }
      </div>
      <div
        className='flex flex-row items-center my-5 justify-start'
      >
        <Button 
          type="submit" 
          className='mx-[10px] w-[100px] border-solid border-[2px] bg-green-500 border-black text-white'
        >
          Submit
        </Button>
        <Button
          className='mx-[10px] w-[100px] border-solid border-[2px] bg-red-500 border-black text-white'
        >
          <Link 
            href="/monsters"
          >
            Cancel
          </Link>
        </Button>
      </div>
    </Form>
  );
}