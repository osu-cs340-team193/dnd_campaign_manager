'use client';

import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';

import { Button, Text } from '@mantine/core';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';

import { deleteLocationMonsterById } from '@/app/lib/actions';

// Page displayed when routing to hostname/monsters
export function AddButton()
{ 
  const router = useRouter();

  return (
    <Button
      variant='filled'
      color='blue'
      radius='md'
      onClick={ () => router.push('/locations-monsters/create') }
    >
      Add
    </Button>
  );
}

export function UpdateButton({ id } : { id: number })
{
  const router = useRouter();

  return (
    <Button
      variant='light'
      color='blue'
      radius='md'
      leftSection={<GrEdit />}
      onClick={ () => router.push(`/locations-monsters/${id}/edit`) }
    >
      <Text
        visibleFrom='xs'
      >
        Edit
      </Text>
    </Button>
  );
}

export function DeleteButton({ id }: { id: number })
{
  const deleteAction = deleteLocationMonsterById.bind(null, id);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(deleteAction);

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