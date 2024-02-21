// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface TableDataProps extends React.TdHTMLAttributes<HTMLTableCellElement>
{
  children?: React.ReactNode;
}

export default function TableData({ children, className, ...rest } : TableDataProps)
{
  return (
    <td
      {...rest}
      className={className}
    >
      {children}
    </td>
  );
}