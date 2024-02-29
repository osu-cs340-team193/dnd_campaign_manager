import EntityTable from '@/app/ui/locations/entity-table';
import 
{ 
  Container, 
  Flex, 
  Text 
} from '@mantine/core';
import { AddButton } from '@/app/ui/buttons';
import { fetchLocations } from '@/app/lib/data';
import 
{ 
  ItemNamesByLocationId, 
  MonsterNamesByLocationId 
} from '@/app/lib/format';

// Page displayed when visiting /locations 
export default async function Page()
{ 
  // Get all locations from the database
  const locations = await fetchLocations();

  // Get M:M info for each location to display in the table view
  const locationRows = await Promise.all(locations.map(async (location) => 
  {
    return {
      location_id: location.location_id ?? 0,
      location_name: location.location_name,
      campaign_name: location.campaign_name,
      location_description: location.location_description ?? '',
      location_monsters: await MonsterNamesByLocationId(location.location_id ?? 0),
      location_items: await ItemNamesByLocationId(location.location_id ?? 0)
    }
  }));

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
            Locations
          </Text>
        </Container>
        <EntityTable
          locations={locationRows}
        />
        <AddButton 
          pageRoot=''
        />
      </Flex>
    </Container>
  );
}