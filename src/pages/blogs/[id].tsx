import Head from "next/head";
import React from "react";

export default function Id(): React.ReactElement {
  return (<>
    <Head>
      <title>Id | Waxwork_ymのブログ</title>
    </Head>
  </>
  )
}

export const getStaticPaths = async (context: any) => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
}