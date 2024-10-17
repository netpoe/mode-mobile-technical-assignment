import clsx from "clsx";
import { CustomLabelProps } from "./CustomLabel.types";

export const CustomLabel: React.FC<CustomLabelProps> & {
  Head: React.FC<CustomLabelProps>;
  Description: React.FC<CustomLabelProps>;
} = ({ children, className }) => {
  return <div className={clsx(className)}>{children}</div>;
};

const Head: React.FC<CustomLabelProps> = ({ children, className, ...props }) => (
  <div
    className={clsx(
      "text-xxs mb-0 flex min-h-[40px] items-center rounded-tl-sm rounded-tr-sm bg-black px-3 py-1 text-muted-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const Description: React.FC<CustomLabelProps> = ({ children, className, ...props }) => (
  <div
    className={clsx(
      "sm:min-h-auto mb-0 flex min-h-[50px] flex-col justify-center rounded-bl-sm rounded-br-sm bg-slate-800 px-3 py-2 text-xs",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

CustomLabel.Head = Head;
CustomLabel.Description = Description;
