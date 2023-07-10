import classes from "./post-content.module.css";
import PostHeader from "./post-header";

export default function PostContent({ post }) {
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} thumbnail={post.thumbnail} />
      <div>{post.abstract}</div>
      <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
    </article>
  );
}
