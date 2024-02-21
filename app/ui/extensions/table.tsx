// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement>
{
  children?: React.ReactNode;
}

export default function Table({ children, className, ...rest } : TableProps)
{
  return (
    <table
      {...rest}
      className={className}
    >
      {children}
    </table>
  );
}