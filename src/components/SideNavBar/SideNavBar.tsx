import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { ROUTES } from "../../routes";
import { NavItem } from "./NavLink";

const MAIN_NAV_ITEMS = [
  {
    name: "Overview",
    path: ROUTES.app.home,
  },
  {
    name: "Stats",
    path: ROUTES.app.stats,
  },
  {
    name: "Tasks",
    path: ROUTES.app.tasks,
  },
  {
    name: "Chat",
    path: ROUTES.app.chat,
  },
  {
    name: "Calendar",
    path: ROUTES.app.calendar,
  },
];

const SECONDARY_NAV_ITEMS = [
  {
    name: "Settings",
    path: "/settings",
  },
  {
    name: "Logout",
    path: "/logout",
  },
];

export function SideNavBar() {
  return (
    <aside
      className={clsx(
        "w-72 py-12 box-border h-full shrink-0",
        "flex flex-col space-y-8",
        "shadow-[inset_-2px_0_0_rgba(240,240,240,1)]"
      )}
    >
      <div className="text-xl font-medium px-14 shrink-0">taskez</div>
      <div className="flex flex-col flex-grow">
        <nav className="flex flex-col flex-grow space-y-4">
          {MAIN_NAV_ITEMS.map((item) => (
            <NavItem key={item.path} href={item.path}>
              {item.name}
            </NavItem>
          ))}
        </nav>
        <nav className="flex flex-col space-y-4">
          {SECONDARY_NAV_ITEMS.map((item) => (
            <NavItem key={item.path} href={item.path}>
              {item.name}
            </NavItem>
          ))}
        </nav>
      </div>
    </aside>
  );
}
