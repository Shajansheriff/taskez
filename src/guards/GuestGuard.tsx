import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export function GuestGuard({ children }: PropsWithChildren) {
  const { status } = useSession();
  const router = useRouter();
  switch (status) {
    case "loading":
      return <>Loading...</>;
    case "authenticated":
      return router.push("/");
    case "unauthenticated":
      return <>{children}</>;
  }
}
