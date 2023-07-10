import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/api-utils";
import Head from "next/head";
import { Fragment } from "react";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Huy&apos;s Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const data = await getFeaturedPosts();

  if (!data) {
    return {
      notFound: true,
    };
  }

  if (data.code === "not_connect_database") {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }

  return {
    props: { posts: data.posts },
    revalidate: 10,
  };
}
