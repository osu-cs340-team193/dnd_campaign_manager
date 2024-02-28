import 
{ 
  Container, 
  Flex, 
  Image, 
  Title 
} from '@mantine/core';

// Page displayed when visitng /home
export default function Page()
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
          Database Overview
        </Title>
        <Image
          radius='md'
          src='/image1.PNG'
        />
        <Image
          radius='md'
          src='/image2.PNG'
        />
      </Flex>
    </Container>
  );
}