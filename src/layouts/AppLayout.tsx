import { ReactElement } from "react";

export function AppLayout(page: ReactElement) {
  return (
    <div>
      <aside></aside>
      <main>{page}</main>
    </div>
  );
}
