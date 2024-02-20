'use client';

// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
  children: React.ReactNode;
}

export default function Button({ children, className, ...rest } : ButtonProps)
{
  return (
    <button 
      {...rest}
      className={className}
    >
      {children}
    </button>
  );
}