import DndIcon from '@/app/ui/icons/dnd-icon';
import 
{ 
  Center, 
  Container, 
  Flex, 
  Text 
} from '@mantine/core';

// App logo component
export default function AppLogo()
{
  return (
    <Container
      size='md'
      px='md'
    >
      <Flex
        direction='row'
        gap='xs'
        justify='center'
      >
        <DndIcon 
          props={{ height: 55 }}
        />
        <Center>
          <Text
            size='xl'
            c='maroon'
          >
            Campaign Manager
          </Text>
        </Center>
      </Flex>
    </Container>
  );
}