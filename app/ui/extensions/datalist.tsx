'use client';

// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface DatalistProps extends React.HTMLAttributes<HTMLDataListElement>
{
  children?: React.ReactNode;
}

export default function Datalist({ children, className, ...rest } : DatalistProps)
{
  return (
    <datalist
      {...rest}
      className={className}
    >
      {children}
    </datalist>
  );
}