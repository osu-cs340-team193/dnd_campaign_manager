// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement>
{
  children?: React.ReactNode;
}

export default function TableHeader({ children, className, ...rest } : TableHeaderProps)
{
  return (
    <th
      {...rest}
      className={className}
    >
      {children}
    </th>
  );
}