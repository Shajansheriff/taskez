import { useRouter } from "next/router";
import { useEffect } from "react";
import { ROUTES } from "../routes";

const IndexPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(ROUTES.app.home);
  });
};

export default IndexPage;
