// Application logo component.
// See: https://nextjs.org/learn/dashboard-app/optimizing-fonts-images

import DndIcon from "@/app/ui/icons/dnd-icon";
import { Center, Container, Flex, Text, Title } from "@mantine/core";

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