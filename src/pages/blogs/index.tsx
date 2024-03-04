import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Theme from "@/components/theme";
import Head from "next/head";
import React, { useState } from "react";
import { client } from "@/libs/client";
import { Blogs, Blog } from "@/types/index";

export default function Blogs({ blogs }: { blogs: Blogs }): React.ReactElement {
  const tabs = ["All", "日記", "テック", "レビュー"];
  const [activeTab, setActiveTab] = useState("All");

  const activate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveTab(e.currentTarget.textContent || "All");
  };

  const removeTagFromString = (str: string) => {
    return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
  }

  return (
    <>
      <Head>
        <title>Blogs | Waxwork_ymのブログ</title>
        <meta name="description" content="Waxworkのブログの記事一覧" />
      </Head>
      <Theme>
        <Header>
          <div className=" w-full h-80 bg-slate-400">
            <h1 className=" text-center w-full pt-32 text-4xl font-serif">ブログ一覧</h1>
          </div>
          <div role="tablist" className="tabs tabs-lifted my-2 mx-1">
            {tabs.map((tab) => (
              <a role="tab" className={`tab ${activeTab === tab ? 'tab-active' : ''}`} onClick={activate} key={tab}>{tab}</a>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {blogs.contents.map((blog: Blog) => (
              <div key={blog.id} className="card shadow-lg">
                <div className="card-body">
                  <img src={blog.eyecatch.url} alt={blog.title} className="w-full h-48 object-cover" />
                  <h2 className="card-title">{blog.title}</h2>
                  <p className="text-xs">{blog.publishedAt.slice(0, 10)}</p>
                  <p className="line-clamp-3">{removeTagFromString(blog.content)}</p>
                </div>
              </div>
            ))}
          </div>
        </Header>
        <Footer />
      </Theme >
    </>
  );
}

export const getStaticProps = async () => {
  const data: Blogs = await client.get({
    endpoint: "blogs",
  }).then((res) => res)
    .catch((err) => console.log(err));

  return {
    props: {
      blogs: data
    },
  }
}