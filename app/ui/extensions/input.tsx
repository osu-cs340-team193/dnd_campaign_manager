'use client';

// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>
{
}

export default function Input({ className, ...rest } : InputProps)
{
  return (
    <input
      {...rest}
      className={className}
    />
  );
}