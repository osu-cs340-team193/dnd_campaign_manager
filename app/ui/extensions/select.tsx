'use client';

// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>
{
  children: React.ReactNode;
}

export default function Select({ children, className, ...rest } : SelectProps)
{
  return (
    <select
      {...rest}
      className={className}
    >
      {children}
    </select>
  );
}