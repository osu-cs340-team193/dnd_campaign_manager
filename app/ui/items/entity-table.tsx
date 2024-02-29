'use client';

import 
{ 
  Container, 
  Flex, 
  Table 
} from '@mantine/core';
import 
{ 
  DeleteButton, 
  UpdateButton 
} from '@/app/ui/buttons';
import { ItemTableRow } from '@/app/lib/definitions';
import { deleteItemById } from '@/app/lib/actions';

// Table view for items entity
// TODO: Have alternate format for mobile layouts. Maybe something like a card per row.
export default function EntityTable({ items }: { items: ItemTableRow[] })
{
  return (
    <Container>
      <Table
        striped='odd'
        withRowBorders={false}
        stickyHeader
        stickyHeaderOffset={60}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Value</Table.Th>
            <Table.Th>Weight</Table.Th>
            <Table.Th>Locations</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            items?.map((item) => (
              <Table.Tr key={item.item_id}>
                <Table.Td>{item.item_id}</Table.Td>
                <Table.Td>{item.item_name}</Table.Td>
                <Table.Td>{item.value}</Table.Td>
                <Table.Td>{item.weight}</Table.Td>
                <Table.Td>{item.item_locations}</Table.Td>
                <Table.Td>
                  <Flex
                    direction='row'
                    gap='xs'
                    visibleFrom='xs'
                  >
                    <UpdateButton 
                      id={item.item_id} 
                      pageRoot='items'
                    />
                    <DeleteButton 
                      id={item.item_id} 
                      onDelete={deleteItemById}
                    />
                  </Flex>
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateButton 
                      id={item.item_id} 
                      pageRoot='items'
                    />
                    <DeleteButton 
                      id={item.item_id} 
                      onDelete={deleteItemById}
                    />
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
    </Container>
  );
}