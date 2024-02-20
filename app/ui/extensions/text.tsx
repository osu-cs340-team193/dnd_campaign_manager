'use client';

// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface TextProps extends React.ComponentPropsWithoutRef<'p'>
{
  children: React.ReactNode;
}

export default function Text({ children, className, ...rest } : TextProps)
{
  return (
    <p
      {...rest}
      className={className}
    >
      {children}
    </p>
  );
}