'use client';

import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

// Page displayed when routing to hostname/monsters
export default function AddMonsterButton()
{ 
  const router = useRouter();

  return (
    <Button
      variant='filled'
      color='blue'
      radius='md'
      onClick={ () => router.push('/monsters/create') }
    >
      Add
    </Button>
  );
}