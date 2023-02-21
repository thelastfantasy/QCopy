import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicMainAppWithNoSSR = dynamic(
  () => import("../features/mainApp/components"),
  {
    ssr: false,
  }
);

const Home: NextPage = () => <DynamicMainAppWithNoSSR />;

export default Home;
