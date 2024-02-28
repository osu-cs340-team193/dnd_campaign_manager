import EntityTable from '@/app/ui/locations/entity-table';

import { Container, Flex, Text } from '@mantine/core';
import { AddButton } from '@/app/ui/locations/buttons';
import { fetchLocations } from '@/app/lib/data';
import 
{ 
  GetFormattedItemNamesByLocationId, 
  GetFormattedMonsterNamesByLocationId 
} from '@/app/lib/format';

// Page displayed when routing to hostname/campaigns
export default async function Page()
{ 
  const locations = await fetchLocations();

  const locationRows = await Promise.all(locations.map(async (location) => 
  {
    return {
      location_id: location.location_id ?? 0,
      location_name: location.location_name,
      campaign_name: location.campaign_name,
      location_description: location.location_description ?? '',
      location_monsters: await GetFormattedMonsterNamesByLocationId(location.location_id ?? 0),
      location_items: await GetFormattedItemNamesByLocationId(location.location_id ?? 0)
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
          locationRows={locationRows}
        />
        <AddButton />
      </Flex>
    </Container>
  );
}