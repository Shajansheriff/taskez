import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from taskez" }]);

  return (
    <>
      <Head>
        <title>Taskez</title>
        <meta name="description" content="A task management app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{hello.data?.greeting}</div>
    </>
  );
};

export default Home;
