import Header from "@/components/Header";
import Theme from "@/components/theme";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <>
      <Head>
        <title>Home | My WeBlog</title>
      </Head>
      <Theme>
        <Header>
          <div>hello world!</div>
        </Header>
      </Theme>
    </>
  );
}
