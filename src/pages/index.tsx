import Header from "@/components/Header";
import Theme from "@/components/theme";
import { Inter } from "next/font/google";
import Head from "next/head";
import { client } from "@/libs/client";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const { contents } = props;
  console.log(contents);
  return (
    <>
      <Head>
        <title>Home | My WeBlog</title>
        <meta name="description" content="My personal blog HomePage" />
      </Head>
      <Theme>
        <Header>
          <div>hello world!</div>
          {contents.map((content: any) => {
            return (
              <div key={content.id}>
                <h2>{content.title}</h2>
              </div>
            );
          })}
        </Header>
      </Theme>
    </>
  );
}

export const getStaticProps = async () => {
  const data: Blogs = await client.get({
    endpoint: "blogs",
  });
  return {
    props: {
      contents: data.contents,
    },
  }
}