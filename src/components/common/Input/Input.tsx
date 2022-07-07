import clsx from "clsx";
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, Ref } from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string;
};
export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, error, ...rest },
  ref
) {
  return (
    <div>
      <input
        type="text"
        name="first-name"
        id="first-name"
        autoComplete="given-name"
        className={clsx(
          "peer",
          "h-10 border border-[#CBDBEA]",
          "w-full p-4",
          "rounded-lg",
          "ring-primary outline-primary focus:ring-primary focus:border-primary",
          "shadow-sm sm:text-sm",
          "invalid:border-red-500 invalid:text-red-600  invalid:outline-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500",
          className
        )}
        ref={ref}
        {...rest}
      />
      {error && (
        <p className="mt-2 invisible peer-invalid:visible text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
});
