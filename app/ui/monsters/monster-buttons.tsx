'use client';

import { deleteMonster } from "@/app/lib/actions/monster-actions";
import { useFormState } from "react-dom";

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from "react-icons/ri";
import { Button, Center, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

export function UpdateMonster({ id } : { id: number })
{
  const router = useRouter();

  return (
    <Button
      variant='light'
      color='blue'
      radius='md'
      leftSection={<GrEdit />}
      onClick={ () => router.push(`/monsters/${id}/edit`) }
    >
      <Text
        visibleFrom='xs'
      >
        Edit
      </Text>
    </Button>
  );
}

export function DeleteMonster({ id }: { id: number })
{
  const deleteMonsterWithId = deleteMonster.bind(null, id);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(deleteMonsterWithId);

  return (
    <form action={dispatch}>
      <Button
        variant='light'
        color='red'
        radius='md'
        leftSection={<RiDeleteBinLine />}
        type='submit'
      >
        <Text
          visibleFrom='xs'
        >
          Delete
        </Text>
      </Button>
    </form>
  );
}