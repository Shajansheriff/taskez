import clsx from "clsx";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";

export function Form({
  children,
  className,
  ...rest
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  return (
    <form
      className={clsx(
        "space-y-8 w-[80%] border-t-2 border-t-[rgba(64,145,223,0.12)] py-8",
        className
      )}
      {...rest}
    >
      {children}
    </form>
  );
}
