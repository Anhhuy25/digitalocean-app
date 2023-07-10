import Link from "next/link";
import React from "react";
import classes from "@/styles/ErrorPage.module.css";

export default function ServerErrorPage() {
  return (
    <div className={`${classes.container} ${classes.internal_server}`}>
      <h2>Oops! Something went wrong.</h2>
      <h1>500</h1>
      <p>
        Unfortunately we&apos;re having trouble loading the page you are looking
        for. Please come back in a while.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
