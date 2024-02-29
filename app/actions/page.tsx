import EntityTable from '@/app/ui/actions/entity-table';
import 
{ 
  Container, 
  Flex, 
  Text 
} from '@mantine/core';
import { AddButton } from '@/app/ui/buttons';
import { fetchActions } from '@/app/lib/data';

// Page displayed when visiting /actions
export default async function Page()
{ 
  // Get all actions from database
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
        <AddButton 
          pageRoot='actions'
        />
      </Flex>
    </Container>
  );
}