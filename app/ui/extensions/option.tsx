'use client';

// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement>
{
  children: React.ReactNode;
}

export default function Option({ children, className, ...rest } : OptionProps)
{
  return (
    <option
      {...rest}
      className={className}
    >
      {children}
    </option>
  );
}