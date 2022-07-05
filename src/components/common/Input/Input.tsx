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
        "focus:ring-primary focus:border-primary",
        "block w-full shadow-sm sm:text-sm border-gray-300 rounded-md",
        className
      )}
      {...rest}
    />
  );
}
