'use client';

import { Flex as MantineFlex } from '@mantine/core';

interface FlexProps
{
  direction?: string;
  justify?: string;
  gap?: string;
}

export default function Flex({ children, className, ...props }: any)
{
  return (
    <MantineFlex
      {...props}
      className={className}
    >
      {children}
    </MantineFlex>
  );
}