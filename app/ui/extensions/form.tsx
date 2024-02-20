'use client';

// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement>
{
  children: React.ReactNode;
}

export default function Form({ children, className, ...rest } : FormProps)
{
  return (
    <form
      {...rest}
      className={className}
    >
      {children}
    </form>
  );
}