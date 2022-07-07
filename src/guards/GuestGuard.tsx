import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactElement, useEffect } from "react";
import { ROUTES } from "../routes";

export function GuestGuard({ children }: PropsWithChildren): ReactElement {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(ROUTES.app.root);
    }
  }, [status, router]);

  switch (status) {
    case "unauthenticated":
      return <>{children}</>;
    case "loading":
    default:
      return <>Loading....</>;
  }
}
