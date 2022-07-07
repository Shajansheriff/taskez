import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CalendarBlank,
  ChartBar,
  Chat,
  ChatTeardropDots,
  FolderOpen,
  Gear,
  House,
  SignOut,
} from "phosphor-react";
import { ReactElement } from "react";
import { ROUTES } from "../../routes";
import { NavItem } from "./NavLink";

const MAIN_NAV_ITEMS = [
  {
    name: "Overview",
    path: ROUTES.app.root,
    icon: House,
  },
  {
    name: "Stats",
    path: ROUTES.app.stats,
    icon: ChartBar,
  },
  {
    name: "Tasks",
    path: ROUTES.app.tasks,
    icon: FolderOpen,
  },
  {
    name: "Chat",
    path: ROUTES.app.chat,
    icon: ChatTeardropDots,
  },
  {
    name: "Calendar",
    path: ROUTES.app.calendar,
    icon: CalendarBlank,
  },
];

const SECONDARY_NAV_ITEMS = [
  {
    name: "Settings",
    path: "/settings",
    icon: Gear,
  },
  {
    name: "Logout",
    path: "/logout",
    icon: SignOut,
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
              <div className="flex items-center space-x-4">
                <item.icon aria-label={item.name} /> <div>{item.name}</div>
              </div>
            </NavItem>
          ))}
        </nav>
        <nav className="flex flex-col space-y-4">
          {SECONDARY_NAV_ITEMS.map((item) => (
            <NavItem key={item.path} href={item.path}>
              <div className="flex items-center space-x-4">
                <item.icon aria-label={item.name} /> <div>{item.name}</div>
              </div>
            </NavItem>
          ))}
        </nav>
      </div>
    </aside>
  );
}
