import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const BoardWithNoSSR = dynamic(() => import("../components/Board/Board"), {
  ssr: false,
});

export default function TasksPage() {
  return (
    <main className="relative overflow-x-auto">
      <BoardWithNoSSR />
    </main>
  );
}
