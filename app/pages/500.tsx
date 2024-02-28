import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Flex, NavLink, Text, Title } from '@mantine/core';
 
export default function InternalServerError() {
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
        500 Internal Server Error 
      </Title>
      <Text>
        Server-side error occurred
      </Text>
      <NavLink
        label='Go Back'
        href='/'
        variant='subtle'
      />
    </Flex>
  );
}