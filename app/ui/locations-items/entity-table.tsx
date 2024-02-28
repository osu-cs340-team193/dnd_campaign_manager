'use client';

import { Container, Flex, Table } from '@mantine/core';

import { DeleteButton, UpdateButton } from '@/app/ui/locations-items/buttons';

import { LocationItem } from '@/app/lib/definitions';

export default function EntityTable({ locationsItems }: { locationsItems: LocationItem[] })
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
            <Table.Th>Location</Table.Th>
            <Table.Th>Item</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            locationsItems?.map((locationItem) => (
              <Table.Tr key={locationItem.location_item_id}>
                <Table.Td>{locationItem.location_item_id}</Table.Td>
                <Table.Td>{locationItem.location_name}</Table.Td>
                <Table.Td>{locationItem.item_name}</Table.Td>
                <Table.Td>
                  <Flex
                    direction='row'
                    gap='xs'
                    visibleFrom='xs'
                  >
                    <UpdateButton id={locationItem.location_item_id ?? -1} />
                    <DeleteButton id={locationItem.location_item_id ?? -1} />
                  </Flex>
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateButton id={locationItem.location_item_id ?? -1} />
                    <DeleteButton id={locationItem.location_item_id ?? -1} />
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