"use client";

import { createMonster } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import Link from "next/link";

import Label from "@/app/ui/extensions/label";
import Input from "@/app/ui/extensions/input";
import Button from "@/app/ui/extensions/button";
import Option from '@/app/ui/extensions/option';
import Form from '@/app/ui/extensions/form';
import Datalist from "@/app/ui/extensions/datalist";

export default function CreateMonsterForm()
{
  const initialState = { message: null, errors: {}};
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(createMonster, initialState);

  return (
    <Form 
      action={dispatch} 
      className='flex flex-col min-w-[500px] border-dashed border-[2px] p-[10px]'
    >
      <div
        className='flex flex-row items-center my-2'
      >
        <Label 
          htmlFor="monster_name" 
          className='mx-[10px] p-[5px] text-purple-900 align-middle flex-1'
        >
          Monster Name
        </Label>
        <Input
          id="monster_name" 
          name="monster_name" 
          type="text" 
          className='p-[2px] border-double border-[5px] text-sm flex-grow' 
        />
      </div>
      <div
        className='flex flex-row items-center my-2'
      >
        <Label 
          htmlFor="armor_class" 
          className='mx-[10px] p-[5px] text-purple-900 align-middle flex-1'
        >
          Armor Class
        </Label>
        <Input 
          id="armor_class" 
          name="armor_class" 
          type="number" 
          className='p-[2px] border-double border-[5px] text-sm w-[100px]' 
        />
      </div>
      <div
        className='flex flex-row items-center my-2'
      >
        <Label 
          htmlFor="hit_points" 
          className='mx-[10px] p-[5px] text-purple-900 align-middle flex-1'
        >
          Hit Points
        </Label>
        <Input 
          id="hit_points" 
          name="hit_points" 
          type="number" 
          className='p-[2px] border-double border-[5px] text-sm w-[100px]' 
        />
      </div>
      <div
        className='flex flex-row items-center my-2'
      >
        <Label 
          htmlFor="monster_type" 
          className='mx-[10px] p-[5px] text-purple-900 align-middle flex-1'
        >
          Monster Type
        </Label>
        <Input 
          list='monsterType' 
          id='monster_type'
          name='monster_type'
          type='text'
          className='p-[2px] border-double border-[5px] text-sm w-[200px]' 
        />
        <Datalist
          id='monsterType'
          className='p-[2px] border-double border-[5px] text-sm w-[200px]' 
        >
          <Option
            value="Diminutive Animal"
          />
          <Option
            value="Fey"
          />
        </Datalist>
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