import { useRouter } from "next/router";
// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

export default function TaskDrawer() {
  const router = useRouter();
  return (
    <Drawer
      open={!!router.query.taskId}
      direction="right"
      className="!w-full sm:!w-96"
      enableOverlay={false}
    >
      <div>
        <header>
          <h4>Design-App</h4>
          <button onClick={() => router.push("/tasks")}>x</button>
        </header>
        <section>
          <div>
            <div>Created by</div>
            <div>Vaibhav Singh</div>
          </div>
        </section>
      </div>
    </Drawer>
  );
}
