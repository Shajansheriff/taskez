import { useRouter } from "next/router";
import { TaskDetail } from "../../components/TaskDrawer/TaskDrawer";

export default function TaskDetailPage() {
  const {
    query: { id },
  } = useRouter();
  const taskId = id as string;
  return <TaskDetail taskId={taskId} />;
}
