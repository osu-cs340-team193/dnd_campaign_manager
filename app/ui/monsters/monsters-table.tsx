'use client';

import { Container, Flex, Table } from '@mantine/core';

import { DeleteMonster, UpdateMonster } from './monster-buttons';

import { Monster } from '@/app/lib/entities/monsters-entity';

export default function MonstersTable({ monsters }: { monsters: Monster[] })
{
  return (
    <Container>
      <Table
        striped='odd'
        withRowBorders={false}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Armor Class</Table.Th>
            <Table.Th>Hit Points</Table.Th>
            <Table.Th>Type</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            monsters?.map((monster) => (
              <Table.Tr key={monster.monster_name}>
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
                    <UpdateMonster id={monster.monster_id ?? -1} />
                    <DeleteMonster id={monster.monster_id ?? -1} />
                  </Flex>
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateMonster id={monster.monster_id ?? -1} />
                    <DeleteMonster id={monster.monster_id ?? -1} />
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