import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/login?callbackUrl=${router.asPath}`);
    },
  });

  if (status === "loading") {
    return <>Loading...</>;
  }

  return <>{children}</>;
}
