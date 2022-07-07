import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { ROUTES } from "../../routes";

export function NavItem({
  href,
  children,
  ...rest
}: {
  href: string;
  children: ReactNode;
}) {
  const { pathname } = useRouter();
  const isActive =
    href === ROUTES.app.root ? pathname === href : pathname.startsWith(href);
  return (
    <Link href={href} passHref>
      <a
        className={clsx(
          "px-14 py-2 w-full hover:text-primary",
          isActive
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
