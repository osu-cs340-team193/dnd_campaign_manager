import { Container, Flex, Title } from '@mantine/core';

// Page displayed when routing to hostname/monsters
export default async function Page()
{ 
  return (
    <Container
      size='md'
      px='lg'
    >
      <Flex
        direction='column'
        gap='lg'
        my='lg'
        justify='center'
        align='center'
      >
        <Title>
          Home Page
        </Title>
      </Flex>
    </Container>
  );
}