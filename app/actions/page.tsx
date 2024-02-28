import EntityTable from '@/app/ui/actions/entity-table';

import { Container, Flex, Text } from '@mantine/core';
import { AddButton } from '@/app/ui/actions/buttons';
import { fetchActions } from '@/app/lib/data';

// Page displayed when routing to hostname/campaigns
export default async function Page()
{ 
  const actions = await fetchActions();

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
            Actions
          </Text>
        </Container>
        <EntityTable
          actions={actions}
        />
        <AddButton />
      </Flex>
    </Container>
  );
}