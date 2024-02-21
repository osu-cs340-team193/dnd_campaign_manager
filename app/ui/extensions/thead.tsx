// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement>
{
  children?: React.ReactNode;
}

export default function TableHead({ children, className, ...rest } : TableHeadProps)
{
  return (
    <thead
      {...rest}
      className={className}
    >
      {children}
    </thead>
  );
}