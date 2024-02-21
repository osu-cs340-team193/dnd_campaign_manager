// Idea borrowed from: nextjs tutorial, button.tsx
// Interface that extends button properties to allow for passing them in.
interface ParagraphProps extends React.ComponentPropsWithoutRef<'p'>
{
  children?: React.ReactNode;
}

export default function Paragraph({ children, className, ...rest } : ParagraphProps)
{
  return (
    <p
      {...rest}
      className={className}
    >
      {children}
    </p>
  );
}