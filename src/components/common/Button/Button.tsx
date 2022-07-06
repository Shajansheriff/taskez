import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export function Button({
  className,
  children,
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={clsx(
        "w-full p-3 rounded-lg bg-primary",
        "text-white text-center",
        "outline-[#133e36] hover:bg-[#133e36] focus:bg-[#133e36]",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
