import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import styles from "../styles/Dashboard.module.css";
import { Fragment } from "react";
import Head from "next/head";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Fragment>
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="View and publish new recipes!" />
        </Head>
        <h1 className={styles.center}>Loading...</h1>
      </Fragment>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Fragment>
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="View and publish new recipes!" />
        </Head>
        <h1 className={styles.title}>You must login to view your dashboard</h1>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="View and publish new recipes!" />
      </Head>
      <h1 className={styles.title}>Welcome {session.user.name}</h1>
      <div className={styles.center}>
        <button className={styles.btn}>
          <Link href="/recipeMaker">Make a Recipe</Link>
        </button>
      </div>
    </Fragment>
  );
}
