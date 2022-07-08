import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { BeatLoader } from "react-spinners";

export function Button({
  className,
  children,
  disabled,
  isLoading = false,
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { isLoading?: boolean }) {
  return (
    <button
      className={clsx(
        "w-full p-3 rounded-lg bg-primary",
        "text-white text-center",
        "outline-[#133e36] hover:bg-[#133e36] focus:bg-[#133e36]",
        "disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <BeatLoader size={10} color="white" /> : children}
    </button>
  );
}
