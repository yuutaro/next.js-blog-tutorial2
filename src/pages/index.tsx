import Header from "@/components/Header";
import Theme from "@/components/theme";
import { Inter } from "next/font/google";
import Head from "next/head";
import { client } from "@/libs/client";
import React from "react";
import Footer from "@/components/Footer";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any): React.ReactElement {
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
          <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Waxwork_ymのブログ</h1>
                <p className="mb-5">to be, or not to be.</p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </Header>
        <Footer />
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