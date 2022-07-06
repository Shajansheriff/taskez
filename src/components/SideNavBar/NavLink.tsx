import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export function NavItem({
  href,
  children,
  ...rest
}: {
  href: string;
  children: ReactNode;
}) {
  const { pathname } = useRouter();
  console.log({ pathname, href, startsWith: pathname.startsWith(href) });

  return (
    <Link href={href} passHref>
      <a
        className={clsx(
          "px-14 py-2 w-full hover:text-primary",
          pathname.startsWith(href)
            ? "text-primary shadow-primary shadow-[inset_-4px_0_0]"
            : "text-[#9a9a9a]"
        )}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}
