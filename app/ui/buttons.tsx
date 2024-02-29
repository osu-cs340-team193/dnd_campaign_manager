'use client';

import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';

import { Button, Text } from '@mantine/core';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';

// Sends user to create form to create a new entity 
export function AddButton({ pageRoot }: { pageRoot: string } )
{ 
  const router = useRouter();

  return (
    <Button
      variant='filled'
      color='blue'
      radius='md'
      onClick={ () => router.push(`/${pageRoot}/create`) }
    >
      Add
    </Button>
  );
}

// Sends user to edit form to update an existing entity
export function UpdateButton({ id, pageRoot }: { id: number, pageRoot: string })
{
  const router = useRouter();

  return (
    <Button
      variant='light'
      color='blue'
      radius='md'
      leftSection={<GrEdit />}
      onClick={ () => router.push(`/${pageRoot}/${id}/edit`) }
    >
      <Text
        visibleFrom='xs'
      >
        Edit
      </Text>
    </Button>
  );
}

// Sends request to delete existing entity
export function DeleteButton(
  { id, onDelete}: 
  { id: number, onDelete: (id: number) => Promise<{message: string}> })
{
  const deleteAction = onDelete.bind(null, id);

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