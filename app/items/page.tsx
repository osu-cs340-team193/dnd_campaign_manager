import EntityTable from '@/app/ui/items/entity-table';

import { Container, Flex, Text } from '@mantine/core';
import { AddButton } from '@/app/ui/items/buttons';
import { fetchItems } from '@/app/lib/data';
import { GetFormattedLocationNamesByItemId } from '@/app/lib/format';

// Page displayed when routing to hostname/campaigns
export default async function Page()
{ 
  const items = await fetchItems();

  const itemRows = await Promise.all(items.map(async (item) => 
  {
    return {
      item_id: item.item_id ?? 0,
      item_name: item.item_name,
      value: item.value ?? 0,
      weight: item.weight ?? 0,
      item_locations: await GetFormattedLocationNamesByItemId(item.item_id ?? 0),
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
            Items
          </Text>
        </Container>
        <EntityTable
          items={itemRows}
        />
        <AddButton />
      </Flex>
    </Container>
  );
}