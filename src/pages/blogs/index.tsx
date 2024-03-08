import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Theme from "@/components/theme";
import Head from "next/head";

import React, { useState } from "react";
import { client } from "@/libs/client";
import { Blogs, Blog } from "@/types/index";
import { useRouter } from "next/router";

export default function Blogs({ blogs }: { blogs: Blogs }): React.ReactElement {
  const router = useRouter();

  const tabs = ["All", "日記", "テック", "レビュー"];
  const [activeTab, setActiveTab] = useState("All");
  //検索用state
  const [inputKeyword, setInputKeyword] = useState("");
  const activate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveTab(e.currentTarget.textContent || "All");
  };

  const removeTagFromString = (str: string) => {
    return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
  };

  const showPage = (e: React.MouseEvent<HTMLDivElement>) => {
    const title = e.currentTarget.querySelector(".card-title")?.textContent;
    const blog = blogs.contents.find((blog) => blog.title === title);
    router.push(`/blogs/${blog?.id}`);
  };

  //入力値をセットする関数
  const changeKeyword = (e :any) => {
    setInputKeyword(e.target.value);
  };

  //フィルタリング関数
  const filterBlogs = (blog: Blog) => {
    return (
      blog.title.includes(inputKeyword) || blog.content.includes(inputKeyword)
    );
  };

  return (
    <>
      <Head>
        <title>Blogs | Waxwork_ymのブログ</title>
        <meta name="description" content="Waxworkのブログの記事一覧" />
      </Head>
      <Theme>
        <Header>
          <div className=" w-full h-80 bg-slate-400">
            <h1 className=" text-center w-full pt-32 text-4xl font-serif">
              ブログ一覧
            </h1>
          </div>
          {/* キーワード検索 */}
          <div className="my-8 w-full flex justify-center">
            <label className="input input-bordered flex items-center border gap-2 w-1/2 ">
              <input
                type="text"
                className="grow"
                placeholder="キーワード検索"
                value={inputKeyword}
                onChange={changeKeyword}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          <div role="tablist" className="tabs tabs-lifted my-2 mx-1">
            {tabs.map((tab) => (
              <a
                role="tab"
                className={`tab ${activeTab === tab ? "tab-active" : ""}`}
                onClick={activate}
                key={tab}
              >
                {tab}
              </a>
            ))}
          </div>
          {/* 元コード
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {blogs.contents.map((blog: Blog) => (
              <div key={blog.id} className="card shadow-lg" onClick={showPage}>
                <div className="card-body">
                  <img
                    src={blog.eyecatch.url}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <h2 className="card-title">{blog.title}</h2>
                  <p className="text-xs">{blog.publishedAt.slice(0, 10)}</p>
                  <p className="line-clamp-3">
                    {removeTagFromString(blog.content)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          */}
          {/* フィルタリングしたブログを取得 title,content対応  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {blogs.contents.filter(filterBlogs).map((blog: Blog) => (
              <div key={blog.id} className="card shadow-lg" onClick={showPage}>
                <div className="card-body">
                  <img
                    src={blog.eyecatch.url}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <h2 className="card-title">{blog.title}</h2>
                  <p className="text-xs">{blog.publishedAt.slice(0, 10)}</p>
                  <p className="line-clamp-3">
                    {removeTagFromString(blog.content)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Header>
        <Footer />
      </Theme>
    </>
  );
}

export const getStaticProps = async () => {
  const data: Blogs = await client
    .get({
      endpoint: "blogs",
    })
    .then((res) => res)
    .catch((err) => console.log(err));

  return {
    props: {
      blogs: data,
    },
  };
};
