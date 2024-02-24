'use client';

import { Button as MantineButton } from '@mantine/core';

// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
  children?: React.ReactNode;
  variant?: string;
  radius?: string;
  uppercase?: boolean;
  fullWidth?: boolean;
}

export default function Button({ children, className, ...props } : ButtonProps)
{
  return (
    <MantineButton
      {...props}
      className={className}
    >
      {children}
    </MantineButton>
  );
}