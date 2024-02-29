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

// Default error page component. Used for 404, 500, etc.

// Citation for the following function:
// Date: 02/28/2024
// Title: Adapted from [Learn Next.js: Handling Errors]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/error-handling
// Description: Error page format adapted from source.
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