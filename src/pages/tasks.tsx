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
      <div className="flex grow flex-col h-full">
        <div className="h-10 flex-shrink-0 flex items-center justify-between">
          <h2 className="text-2xl font-medium mb-6 block shrink-0">Tasks</h2>
        </div>
        <BoardWithoutSSR />
      </div>
      <TaskDrawerWithoutSSR />
    </>
  );
}
