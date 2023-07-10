import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/api-utils";
import Head from "next/head";
import { Fragment } from "react";

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={props.posts} />;
    </Fragment>
  );
}

export default AllPostsPage;

export async function getStaticProps() {
  const data = await getAllPosts();

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
