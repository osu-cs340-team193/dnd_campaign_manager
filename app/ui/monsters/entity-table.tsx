'use client';

import { Container, Flex, Table } from '@mantine/core';

import { DeleteButton, UpdateButton } from '@/app/ui/monsters/buttons';

import { Monster } from '@/app/lib/definitions';

export default function EntityTable({ monsters }: { monsters: Monster[] })
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
            <Table.Th>Armor Class</Table.Th>
            <Table.Th>Hit Points</Table.Th>
            <Table.Th>Type</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            monsters?.map((monster) => (
              <Table.Tr key={monster.monster_id}>
                <Table.Td>{monster.monster_id}</Table.Td>
                <Table.Td>{monster.monster_name}</Table.Td>
                <Table.Td>{monster.armor_class}</Table.Td>
                <Table.Td>{monster.hit_points}</Table.Td>
                <Table.Td>{monster.monster_type}</Table.Td>
                <Table.Td>
                  <Flex
                    direction='row'
                    gap='xs'
                    visibleFrom='xs'
                  >
                    <UpdateButton id={monster.monster_id ?? -1} />
                    <DeleteButton id={monster.monster_id ?? -1} />
                  </Flex>
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateButton id={monster.monster_id ?? -1} />
                    <DeleteButton id={monster.monster_id ?? -1} />
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