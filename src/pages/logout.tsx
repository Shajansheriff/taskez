import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PlainLayout } from "../layouts/PlainLayout";
import { ROUTES } from "../routes";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.replace(ROUTES.login);
    });
  }, [router]);
}

LogoutPage.getLayout = PlainLayout;
