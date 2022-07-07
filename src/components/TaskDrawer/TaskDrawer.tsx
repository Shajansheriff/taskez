import clsx from "clsx";
import { useRouter } from "next/router";
import TextArea from "rc-textarea";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { ROUTES } from "../../routes";

import { trpc } from "../../utils/trpc";

function TaskDetail({ taskId }: { taskId: string }) {
  const { data } = trpc.useQuery(["task.get", { id: taskId }], {
    staleTime: 0,
  });
  const router = useRouter();
  const goToTasks = () => router.push(ROUTES.app.tasks);
  const context = trpc.useContext();
  const invalidateBoard = () => context.invalidateQueries("task.board");
  const { mutate } = trpc.useMutation(["task.update"], {
    onSuccess: invalidateBoard,
  });
  const { mutate: deleteTask } = trpc.useMutation(["task.delete"], {
    onSuccess: () => {
      invalidateBoard();
      goToTasks();
    },
  });

  const markComplete = () =>
    mutate(
      { id: taskId, status: "COMPLETED" },
      {
        onSuccess: () =>
          context.invalidateQueries(["task.get", { id: taskId }]),
      }
    );
  const markTodo = () =>
    mutate(
      { id: taskId, status: "TODO" },
      {
        onSuccess: () =>
          context.invalidateQueries(["task.get", { id: taskId }]),
      }
    );
  const updateName = (name: string) => mutate({ id: taskId, name });
  const updateDescription = (description: string) =>
    mutate({ id: taskId, description });

  return (
    <>
      {!data ? (
        <>Loading...</>
      ) : (
        <>
          <header className="border-b px-4 py-2 border-b-gray-300 flex justify-between">
            <button
              className={clsx(
                "rounded-lg px-2 py-1 text-sm",
                "border border-gray-300 ",
                "hover:bg-green-50 hover:text-green-700 hover:border-green-700",
                data.status === "COMPLETED" && "bg-green-50 text-green-700 border-green-700"
              )}
              onClick={data.status === "COMPLETED" ? markTodo : markComplete}
            >
              {data.status === "COMPLETED" ? "Completed" : "Mark complete"}
            </button>
            <div className="flex shrink-0 items-center gap-2">
              <button onClick={() => deleteTask(taskId)} className="block">
                del
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center p-4"
                onClick={goToTasks}
              >
                x
              </button>
            </div>
          </header>
          <section className="px-4 py-3">
            <TextArea
              className="w-full p-4 rounded-lg outline-primary"
              defaultValue={data.name}
              rows={1}
              onBlur={(e) => updateName(e.target.value)}
            />
            <section className="w-full space-y-6">
              <div className="flex items-center">
                <div className="text-[#6B6B6B] text-xs p-2 px-4 shrink-0">
                  Created by
                </div>
                <div className="w-full pl-4 text-[#2E2E2E] text-sm">
                  {data.createdBy?.name}
                </div>
              </div>
              <div className="flex items-start">
                <label
                  className="text-[#6B6B6B] text-xs p-2 px-4"
                  htmlFor="description"
                >
                  Description
                </label>
                <div className="w-full pl-4">
                  <TextArea
                    className="w-full border border-gray-300 rounded-lg outline-primary p-3"
                    id="description"
                    defaultValue={data.description ?? ""}
                    onBlur={(e) => updateDescription(e.target.value)}
                  />
                </div>
              </div>
            </section>
          </section>
        </>
      )}
    </>
  );
}

export default function TaskDrawer() {
  const router = useRouter();
  const taskIdFromQuery = router.query.taskId;
  const taskId = Array.isArray(taskIdFromQuery)
    ? taskIdFromQuery[0]
    : taskIdFromQuery;
  return (
    <Drawer
      open={!!taskId}
      direction="right"
      className="!w-full md:!w-[532px]"
      enableOverlay={false}
    >
      {taskId ? <TaskDetail taskId={taskId} /> : null}
    </Drawer>
  );
}
