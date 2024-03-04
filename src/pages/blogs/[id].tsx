import Header from "@/components/Header";
import Theme from "@/components/theme";
import Head from "next/head";
import React from "react";
import { client } from "@/libs/client";
import { Blog, Blogs } from "@/types/index";
import { url } from "inspector";
import Footer from "@/components/Footer";

export default function Id({ id, blog }: { id: string, blog: Blog }): React.ReactElement {
  console.log(blog);
  return (
    <>
      <Head>
        <title>Id | Waxwork_ymのブログ</title>
        <meta name="description" content={blog.title} />
      </Head>
      <Theme>
        <Header>
          <div className=" w-full h-80 bg-base-100 flex flex-col items-center justify-center" style={{ backgroundImage: `url(${blog.eyecatch.url})`, backgroundSize: "cover" }}>
            <h1 className=" text-center w-full pt-32 text-4xl font-serif">{blog.title}</h1>
            <p className=" text-center mt-8 font-serif">Published at {blog.publishedAt.slice(0, 10)}</p>
          </div>
          <div className=" bg-base-200 w-full p-4 flex items-center justify-center">
            <div className=" p-4 max-w-96 border border-base-300 shadow"
              dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </div>
        </Header>
        <Footer />
      </Theme>
    </>
  );
}

export const getStaticPaths = async () => {
  const data: Blogs = await client.get({
    endpoint: "blogs",
  }).then((res) => res)
    .catch((err) => console.log(err));

  const ids: { params: { id: string } }[] = data.contents.map((blog) => {
    return {
      params: {
        id: blog.id,
      },
    };
  });

  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data: Blog = await client.get({
    endpoint: `blogs`,
    contentId: id,
  })
    .then((res) => res)
    .catch((err) => console.log(err));

  return {
    props: {
      id,
      blog: data,
    },
  };
}