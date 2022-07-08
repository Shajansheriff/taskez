import { SyncLoader } from "react-spinners";

export function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SyncLoader className="sync-loader" />
    </div>
  );
}
