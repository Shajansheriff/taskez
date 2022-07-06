import dynamic from "next/dynamic";
import { AppLayout } from "../layouts";

const BoardWithoutSSR = dynamic(() => import("../components/Board/Board"), {
  ssr: false,
});

const TaskDrawerWithoutSSR = dynamic(
  () => import("../components/TaskDrawer/TaskDrawer"),
  {
    ssr: false,
  }
);

export default function TasksPage() {
  return (
    <div className="relative h-full">
      <BoardWithoutSSR />
      <TaskDrawerWithoutSSR />
    </div>
  );
}

TasksPage.getLayout = AppLayout;
