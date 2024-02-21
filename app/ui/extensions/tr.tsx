// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement>
{
  children?: React.ReactNode;
}

export default function TableRow({ children, className, ...rest } : TableRowProps)
{
  return (
    <tr
      {...rest}
      className={className}
    >
      {children}
    </tr>
  );
}