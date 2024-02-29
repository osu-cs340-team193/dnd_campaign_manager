import EntityTable from '@/app/ui/locations-items/entity-table';
import 
{ 
  Container, 
  Flex, 
  Text 
} from '@mantine/core';
import { AddButton } from '@/app/ui/buttons';
import { fetchLocationsItems } from '@/app/lib/data';

// Page displayed when routing to /locations-items
export default async function Page()
{ 
  // Get all locations-items from database
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
        <AddButton 
          pageRoot='locations-items'
        />
      </Flex>
    </Container>
  );
}