// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>
{
  children?: React.ReactNode;
}

export default function Label({ children, className, ...rest } : LabelProps)
{
  return (
    <label
      {...rest}
      className={className}
    >
      {children}
    </label>
  );
}