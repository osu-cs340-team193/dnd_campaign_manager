'use client';

import { TextInput } from '@mantine/core';

// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>
{
  error?: string;
}

export default function Input({ className, ...props } : InputProps)
{
  return (
    <TextInput
      className={className}
      id={props.id}
      name={props.name}
      type={props.type}
      defaultValue={props.defaultValue}
      error={props.error}
      aria-label={props['aria-label']}
    />
  );
}