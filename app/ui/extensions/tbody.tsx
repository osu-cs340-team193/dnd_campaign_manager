// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement>
{
  children?: React.ReactNode;
}

export default function TableBody({ children, className, ...rest } : TableBodyProps)
{
  return (
    <tbody
      {...rest}
      className={className}
    >
      {children}
    </tbody>
  );
}