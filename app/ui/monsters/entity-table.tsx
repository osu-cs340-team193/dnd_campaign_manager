'use client';

import { Container, Flex, Table } from '@mantine/core';
import { DeleteButton, UpdateButton } from '@/app/ui/buttons';
import { MonsterTableRow } from '@/app/lib/definitions';
import { deleteMonsterById } from '@/app/lib/actions';

// Table view for monsters entity
// TODO: Have alternate format for mobile layouts. Maybe something like a card per row.
export default function EntityTable(
  { monsters }: 
  { monsters: MonsterTableRow[] })
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
            <Table.Th>Armor Class</Table.Th>
            <Table.Th>Hit Points</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th>Locations</Table.Th>
            <Table.Th></Table.Th>
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
                <Table.Td>{monster.monster_actions}</Table.Td>
                <Table.Td>{monster.monster_locations}</Table.Td>
                <Table.Td>
                  {/* Mobile view */ }
                  <Flex
                    direction='row'
                    gap='xs'
                    visibleFrom='xs'
                  >
                    <UpdateButton 
                      id={monster.monster_id} 
                      pageRoot='monsters'
                    />
                    <DeleteButton 
                      id={monster.monster_id} 
                      onDelete={deleteMonsterById} 
                    />
                  </Flex>
                  {/* Desktop view */ }
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateButton 
                      id={monster.monster_id} 
                      pageRoot='monsters'
                    />
                    <DeleteButton 
                      id={monster.monster_id} 
                      onDelete={deleteMonsterById} 
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