'use client';

import { FaceFrownIcon } from '@heroicons/react/24/outline';
import 
{ 
  Center, 
  Flex, 
  NavLink, 
  Text, 
  Title 
} from '@mantine/core';

// TODO: Add citation
// Default error page component. Used for 404, 500, etc.
export default function Error({ message, details }: { message: string, details: string })
{
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
        {message}
      </Title>
      <Text>
        {details}
      </Text>
      <Center>
        <NavLink
          label='Go Home'
          href='/'
          variant='subtle'
        />
      </Center>
    </Flex>
  );
}