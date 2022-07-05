import { trpc } from "../utils/trpc";

export default function TasksPage() {
  const result = trpc.useQuery(["task.getAll"]);
  return (
    <div>
      <h1>Tasks</h1>
      {result.data?.map((task) => (
        <li key={task.id}>{task.name}</li>
      ))}
    </div>
  );
}
