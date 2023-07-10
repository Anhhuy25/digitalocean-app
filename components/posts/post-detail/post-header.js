import Image from "next/legacy/image";
import classes from "./post-header.module.css";

export default function PostHeader(props) {
  const { title, thumbnail } = props;

  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image
        src={thumbnail ?? "/images/site/default.jpeg"}
        alt={title}
        width={200}
        height={150}
      />
    </header>
  );
}
