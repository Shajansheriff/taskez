import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { ROUTES } from "../routes";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: ROUTES.login });
  });
}
