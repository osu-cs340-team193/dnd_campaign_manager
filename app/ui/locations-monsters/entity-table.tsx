'use client';

import { Container, Flex, Table } from '@mantine/core';

import { DeleteButton, UpdateButton } from '@/app/ui/locations-monsters/buttons';

import { LocationMonster } from '@/app/lib/definitions';

export default function EntityTable({ locationsMonsters }: { locationsMonsters: LocationMonster[] })
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
            <Table.Th>Monster</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            locationsMonsters?.map((locationMonster) => (
              <Table.Tr key={locationMonster.location_monster_id}>
                <Table.Td>{locationMonster.location_monster_id}</Table.Td>
                <Table.Td>{locationMonster.location_name}</Table.Td>
                <Table.Td>{locationMonster.monster_name}</Table.Td>
                <Table.Td>
                  <Flex
                    direction='row'
                    gap='xs'
                    visibleFrom='xs'
                  >
                    <UpdateButton id={locationMonster.location_monster_id ?? -1} />
                    <DeleteButton id={locationMonster.location_monster_id ?? -1} />
                  </Flex>
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateButton id={locationMonster.location_monster_id ?? -1} />
                    <DeleteButton id={locationMonster.location_monster_id ?? -1} />
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