'use client';

import { Container, Flex, Table } from '@mantine/core';

import { DeleteButton, UpdateButton } from '@/app/ui/locations/buttons';

import { LocationTableRow } from '@/app/lib/definitions';

export default function EntityTable(
  { locationRows }: 
  { locationRows: LocationTableRow[] })
{
  return (
    <Container>
      <Table
        striped='odd'
        withRowBorders={false}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Campaign</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Monsters</Table.Th>
            <Table.Th>Items</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            locationRows?.map((location) => (
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
                    <UpdateButton id={location.location_id ?? -1} />
                    <DeleteButton id={location.location_id ?? -1} />
                  </Flex>
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateButton id={location.location_id ?? -1} />
                    <DeleteButton id={location.location_id ?? -1} />
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