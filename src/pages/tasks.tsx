import dynamic from "next/dynamic";

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
    <>
      <main className="relative overflow-x-auto">
        <BoardWithoutSSR />
      </main>
      <TaskDrawerWithoutSSR />
    </>
  );
}
