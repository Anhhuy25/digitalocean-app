import Link from "next/link";
import React from "react";
import classes from "@/styles/ErrorPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={`${classes.container} ${classes.not_found}`}>
      <h2>Oops! Page not found.</h2>
      <h1>404</h1>
      <p>We can&apos;t find the page you&apos;re looking for</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
