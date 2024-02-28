'use client';

import { Container, Flex, Table, Text } from '@mantine/core';

import { DeleteButton, UpdateButton } from '@/app/ui/actions/buttons';

import { Action } from '@/app/lib/definitions';

export default function EntityTable({ actions }: { actions: Action[] })
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
            <Table.Th>Monster</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            actions?.map((action) => (
              <Table.Tr key={action.action_id}>
                <Table.Td>{action.action_id}</Table.Td>
                <Table.Td>{action.action_name}</Table.Td>
                <Table.Td>{action.monster_name}</Table.Td>
                <Table.Td>
                  <Text
                    lineClamp={4}
                  >
                    {action.action_description}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Flex
                    direction='row'
                    gap='xs'
                    visibleFrom='xs'
                  >
                    <UpdateButton id={action.action_id ?? -1} />
                    <DeleteButton id={action.action_id ?? -1} />
                  </Flex>
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateButton id={action.action_id ?? -1} />
                    <DeleteButton id={action.action_id ?? -1} />
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