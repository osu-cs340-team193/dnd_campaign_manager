import EntityTable from '@/app/ui/monsters/entity-table';

import { Container, Flex, Text } from '@mantine/core';
import { AddButton } from '@/app/ui/monsters/buttons';
import { fetchMonsters } from '@/app/lib/data';

// Page displayed when routing to hostname/monsters
export default async function Page()
{ 
  const monsters = await fetchMonsters();

  return (
    <Container
      size='md'
      px='lg'
    >
      <Flex
        direction='column'
        gap='lg'
        my='lg'
      >
        <Container
        >
          <Text
            size='xl'
            c='teal'
          >
            Monsters
          </Text>
        </Container>
        <EntityTable
          monsters={monsters}
        />
        <AddButton />
      </Flex>
    </Container>
  );
}