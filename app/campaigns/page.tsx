import EntityTable from '@/app/ui/campaigns/entity-table';

import { Container, Flex, Text } from '@mantine/core';
import { AddButton } from '@/app/ui/campaigns/buttons';
import { fetchCampaigns } from '@/app/lib/data';

// Page displayed when routing to hostname/campaigns
export default async function Page()
{ 
  const campaigns = await fetchCampaigns();

  return (
    <Container
      size='md'
      px='lg'
    >
      <Flex
        direction='column'
        gap='lg'
        my='lg'
      >
        <Container
        >
          <Text
            size='xl'
            c='teal'
          >
            Campaigns
          </Text>
        </Container>
        <EntityTable
          campaigns={campaigns}
        />
        <AddButton />
      </Flex>
    </Container>
  );
}