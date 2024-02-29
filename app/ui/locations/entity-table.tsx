'use client';

import { Container, Flex, Table } from '@mantine/core';
import { DeleteButton, UpdateButton } from '@/app/ui/buttons';
import { LocationTableRow } from '@/app/lib/definitions';
import { deleteLocationById } from '@/app/lib/actions';

// Table view for locations entity
// TODO: Have alternate format for mobile layouts. Maybe something like a card per row.
export default function EntityTable(
  { locations }: 
  { locations: LocationTableRow[] })
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
            <Table.Th>Campaign</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Monsters</Table.Th>
            <Table.Th>Items</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            locations?.map((location) => (
              <Table.Tr key={location.location_id}>
                <Table.Td>{location.location_id}</Table.Td>
                <Table.Td>{location.location_name}</Table.Td>
                <Table.Td>{location.campaign_name}</Table.Td>
                <Table.Td>{location.location_description}</Table.Td>
                <Table.Td>{location.location_monsters}</Table.Td>
                <Table.Td>{location.location_items}</Table.Td>
                <Table.Td>
                  <Flex
                    direction='row'
                    gap='xs'
                    visibleFrom='xs'
                  >
                    <UpdateButton 
                      id={location.location_id} 
                      pageRoot='locations'
                    />
                    <DeleteButton 
                      id={location.location_id} 
                      onDelete={deleteLocationById}
                    />
                  </Flex>
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateButton 
                      id={location.location_id} 
                      pageRoot='locations'
                    />
                    <DeleteButton 
                      id={location.location_id} 
                      onDelete={deleteLocationById}
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