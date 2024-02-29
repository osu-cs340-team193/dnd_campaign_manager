import EntityTable from '@/app/ui/items/entity-table';
import 
{ 
  Container, 
  Flex, 
  Text 
} from '@mantine/core';
import { AddButton } from '@/app/ui/buttons';
import { fetchItems } from '@/app/lib/data';
import { LocationNamesByItemId } from '@/app/lib/format';

// Page displayed when visiting /items
export default async function Page()
{ 
  // Get all item names
  const items = await fetchItems();

  // Get M:M info for each item to display in the table view
  const itemRows = await Promise.all(items.map(async (item) => 
  {
    return {
      item_id: item.item_id ?? 0,
      item_name: item.item_name,
      value: item.value ?? 0,
      weight: item.weight ?? 0,
      item_locations: await LocationNamesByItemId(item.item_id ?? 0),
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
        <AddButton 
          pageRoot='items'
        />
      </Flex>
    </Container>
  );
}