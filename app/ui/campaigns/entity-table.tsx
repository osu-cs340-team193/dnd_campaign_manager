'use client';

import { Container, Flex, Table } from '@mantine/core';

import { DeleteButton, UpdateButton } from '@/app/ui/campaigns/buttons';

import { Campaign } from '@/app/lib/definitions';

export default function EntityTable({ campaigns }: { campaigns: Campaign[] })
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
            <Table.Th>Title</Table.Th>
            <Table.Th>Start Date</Table.Th>
            <Table.Th>End Date</Table.Th>
            <Table.Th>Dungeon Master</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            campaigns?.map((campaign) => (
              <Table.Tr key={campaign.campaign_id}>
                <Table.Td>{campaign.campaign_id}</Table.Td>
                <Table.Td>{campaign.title }</Table.Td>
                <Table.Td>{campaign.start_date ? campaign.start_date : ''}</Table.Td>
                <Table.Td>{campaign.end_date ? campaign.end_date : ''}</Table.Td>
                <Table.Td>{campaign.dungeon_master}</Table.Td>
                <Table.Td>
                  <Flex
                    direction='row'
                    gap='xs'
                    visibleFrom='xs'
                  >
                    <UpdateButton id={campaign.campaign_id ?? -1} />
                    <DeleteButton id={campaign.campaign_id ?? -1} />
                  </Flex>
                  <Flex
                    direction='column'
                    gap='xs'
                    hiddenFrom='xs'
                  >
                    <UpdateButton id={campaign.campaign_id ?? -1} />
                    <DeleteButton id={campaign.campaign_id ?? -1} />
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