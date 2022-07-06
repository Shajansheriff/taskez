import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export function Input({ className, ...rest }: Props) {
  return (
    <input
      type="text"
      name="first-name"
      id="first-name"
      autoComplete="given-name"
      className={clsx(
        "h-10 border border-[#CBDBEA]",
        "w-full p-4",
        "rounded-lg",
        "ring-primary outline-primary focus:ring-primary focus:border-primary",
        "shadow-sm sm:text-sm",
        className
      )}
      {...rest}
    />
  );
}
