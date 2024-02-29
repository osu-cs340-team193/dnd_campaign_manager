'use client';

import AppLogo from '@/app/ui/app-logo';
import { 
  AppShell, 
  Burger, 
  Flex, 
  Group 
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Navbar from '@/app/ui/navbar';

// Application container. All components are managed by this one.

// Citation for the following function:
// Date: 02/23/2024
// Title: Adapted from [Mantine: AppShell Examples]
// Type: Source Code
// Author: Mantine Dev 
// Code Version: N/A
// Source URL: https://mantine.dev/app-shell/?e=MobileNavbar&s=code
// Description: Component formatting and mobile-only nav logic borrowed from source.
export default function App({ children }: Readonly<{ children: React.ReactNode }>) 
{
  const [opened, { toggle: toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !opened, desktop: true }
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group
          h='100%'
          px='md'
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom='md'
            size='md'
          />
          <Group
            justify='space-between'
            style={{ flex: 1 }}
          >
            <AppLogo />

            <Group
              ml='xl'
              gap={0}
              visibleFrom='md'
            >
              <Flex
                direction='row'
                gap='xs'
              >
                <Navbar />
              </Flex>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p='lg'
      >
        <Flex
          direction='column'
          gap='xs'
        >
          <Navbar />
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>

    </AppShell>
  );
}
