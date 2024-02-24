'use client';

import SideNav from "@/app/ui/navigation/sidenav";
import AppLogo from "@/app/ui/app-logo";
import { AppShell, Burger, Flex, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavLinks from '@/app/ui/navigation/nav-links';
import TopNav from "./navigation/topnav";

// See: https://mantine.dev/app-shell/?e=MobileNavbar&s=code
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
              <TopNav />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p='lg'
      >
        <SideNav/>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>

    </AppShell>
  );
}
