import { ReactElement } from "react";
import { SideNavBar } from "../components/SideNavBar";

export function AppLayout(page: ReactElement) {
  return (
    <div className="flex h-full overflow-hidden">
      <SideNavBar />
      <main className="h-full">{page}</main>
    </div>
  );
}
