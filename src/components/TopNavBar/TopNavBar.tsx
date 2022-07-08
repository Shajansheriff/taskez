import { useSession } from "next-auth/react";
import { MagnifyingGlass } from "phosphor-react";
import { Avatar } from "../common/Avatar";

export function TopNavBar() {
  const { data } = useSession();
  return (
    <header className="shrink-0 sticky w-full h-16 p-4">
      <div className="flex w-full h-full items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-400">
          <MagnifyingGlass /> <div>Search</div>
        </div>
        <div>
          <Avatar
            size="md"
            src={data?.user?.image ?? ""}
            alt={data?.user?.name ?? ""}
            name={data?.user?.name ?? ""}
          />
        </div>
      </div>
    </header>
  );
}
