import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Theme from "@/components/theme";
import Head from "next/head";
import Search from "@/components/Search";
import Pagenation from "@/components/Pagenation";

import React, { useState, useEffect } from "react";
import { client } from "@/libs/client";
import { Blogs, Blog } from "@/types/index";
import { useRouter } from "next/router";

export default function Blogs({ blogs }: { blogs: Blogs }): React.ReactElement {
  const router = useRouter();

  const tabs = ["All", "日記", "テック", "レビュー"];
  const [activeTab, setActiveTab] = useState("All");
  //検索用state
  const [inputKeyword, setInputKeyword] = useState("");
  //現在のページ番号state
  const [page, setPage] = useState(1);
  //ページネーション番号state
  const [pageNumber, setPageNumber] = useState([1, 2, 3, 4, 5]);

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

  /*
  1.全てのブログを取得→blogs
  2.検索ワードに含まれるblogsをフィルタリングして取得→filteredBlogs
  3.1ページに表示するブログをfilteredBlogsから算出し取得→onePageBlogs
  */
  //フィルタリング関数
  const filterBlogs = (blog: Blog) => {
    return (
      blog.title.includes(inputKeyword) || blog.content.includes(inputKeyword)
    );
  };
  //フィルタリングしたブログを取得
  const filteredBlogs = blogs.contents.filter(filterBlogs);
  //ブログの総数を取得
  const blogCount = filteredBlogs.length;
  //ページ総数を算出
  const pageMax = Math.ceil(blogCount / 1);
  //1ページあたりに表示するブログ数を算出
  const onePageBlogs = filteredBlogs.slice((page - 1) * 1, page * 1);

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
          <Search
            inputKeyword={inputKeyword}
            setInputKeyword={setInputKeyword}
          />
          <h1 className="w-full flex justify-center">
            現在のページ番号：{page} / {pageMax}
            　　表示ブログ数：{blogCount}
          </h1>
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

          {/* フィルタリングしたブログをmap */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {onePageBlogs.map((blog: Blog) => (
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

          <Pagenation
            page={page}
            setPage={setPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageMax={pageMax}
          />
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
