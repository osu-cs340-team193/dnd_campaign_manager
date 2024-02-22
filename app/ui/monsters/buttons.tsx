'use client';

import { deleteMonster } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import Button from "@/app/ui/extensions/button";
import Form from "@/app/ui/extensions/form";
import Paragraph from "@/app/ui/extensions/p";
import Link from "next/link";

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from "react-icons/ri";

export function UpdateMonster({ id } : { id: number })
{
  return (
    <Link
      href={`/monsters/${id}/edit`}
      className='px-[10px]'
    >
      <GrEdit 
        className='text-2xl'
      />
    </Link>
  );
}

export function DeleteMonster({ id }: { id: number })
{
  const deleteMonsterWithId = deleteMonster.bind(null, id);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(deleteMonsterWithId);

  return (
    <Form 
      action={dispatch}
      className='px-[10px]'
    >
      <Button
        className=''
      >
        <RiDeleteBinLine
          className='text-2xl'
        />
      </Button>
    </Form>
  );
}