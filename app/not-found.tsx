import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Flex, NavLink, Text, Title } from '@mantine/core';
 
export default function NotFound() {
  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
    >
      <FaceFrownIcon 
        height='250px'
      />
      <Title>
        404 Not Found
      </Title>
      <Text>
        Could not find the requested page.
      </Text>
      <NavLink
        label='Go Back'
        href='/'
        variant='subtle'
      />
    </Flex>
  );
}