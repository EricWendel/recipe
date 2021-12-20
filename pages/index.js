import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react/cjs/react.production.min";
import styles from "../styles/Home.module.css";
import Login from "./components/Login.js";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="View and publish new recipes!" />
      </Head>
      <h1 className={styles.title}>Recipe Home</h1>
      <div className={styles.center}>
        <button className={styles.btn}>
          <Link href="/recipeMaker">Make a Recipe</Link>
        </button>
      </div>

      <div className={styles.center}>
        <button className={styles.btn}>
          <Link href="/dashboard">Dashboard</Link>
        </button>
      </div>

      <div className={styles.center}>
        <Login />
      </div>

      <div className={styles.center}>
        <ul>
          <p className={styles.link}>
            <Link href="/recipe/Eric/ChickenSandwich">Chicken Sandwich</Link>
          </p>
          <p className={styles.link}>
            <Link href="/recipe/Eric/ApplePie">Apple Pie</Link>
          </p>
          <p className={styles.link}>
            <Link href="/recipe/Eric/Muffin">Muffin</Link>
          </p>
        </ul>
      </div>
    </Fragment>
  );
}
