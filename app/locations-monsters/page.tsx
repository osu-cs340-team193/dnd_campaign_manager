import EntityTable from '@/app/ui/locations-monsters/entity-table';

import { Container, Flex, Text } from '@mantine/core';
import { AddButton } from '@/app/ui/locations-monsters/buttons';
import { fetchLocationsMonsters } from '@/app/lib/data';

// Page displayed when routing to hostname/campaigns
export default async function Page()
{ 
  const locationsMonsters = await fetchLocationsMonsters();

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
            Locations-Monsters
          </Text>
        </Container>
        <EntityTable
          locationsMonsters={locationsMonsters}
        />
        <AddButton />
      </Flex>
    </Container>
  );
}