import MonstersTable from '@/app/ui/monsters/monsters-table';

import { Container, Flex, Text } from '@mantine/core';
import AddMonsterButton from '@/app/ui/monsters/add-monster-button';
import { fetchMonsters } from '@/app/lib/data/monster-data';

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
        <MonstersTable
          monsters={monsters}
        />
        <AddMonsterButton />
      </Flex>
    </Container>
  );
}