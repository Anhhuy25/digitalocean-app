import React from "react";
import classes from "./posts-grid.module.css";
import PostItem from "./post-item";

export default function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  );
}
