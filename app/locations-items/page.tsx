import EntityTable from '@/app/ui/locations-items/entity-table';

import { Container, Flex, Text } from '@mantine/core';
import { AddButton } from '@/app/ui/locations-items/buttons';
import { fetchLocationsItems } from '@/app/lib/data';

// Page displayed when routing to hostname/campaigns
export default async function Page()
{ 
  const locationsItems = await fetchLocationsItems();

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
            Locations-Items
          </Text>
        </Container>
        <EntityTable
          locationsItems={locationsItems}
        />
        <AddButton />
      </Flex>
    </Container>
  );
}