import * as RxAvatar from "@radix-ui/react-avatar";
import clsx from "clsx";
export function Avatar({
  src,
  alt,
  name,
  size = "xs",
}: {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <RxAvatar.Root
      className={clsx(
        "w-6 h-6 rounded-full overflow-hidden",
        "inline-flex items-center justify-center bg-primary",
        size === "xs" && "w-6 h-6",
        size === "sm" && "w-8 h-8",
        size === "md" && "w-10 h-10",
        size === "lg" && "w-11 h-11"
      )}
    >
      <RxAvatar.Image
        className="w-full h-full object-cover "
        src={src}
        alt={alt}
      />
      <RxAvatar.Fallback
        className={clsx(
          "w-full h-full flex items-center justify-center",
          "text-white"
        )}
      >
        {name
          ?.split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()}
      </RxAvatar.Fallback>
    </RxAvatar.Root>
  );
}
