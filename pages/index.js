import Link from "next/link";
import { Fragment } from "react/cjs/react.production.min";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Fragment>
      <h1 className={styles.title}>Recipe Home</h1>
      <div className={styles.main}>
        <ul>
          <p className={styles.link}>
            <Link href="/recipe/ChickenSandwich">Chicken Sandwich</Link>
          </p>
          <p className={styles.link}>
            <Link href="/recipe/ApplePie">Apple Pie</Link>
          </p>
          <p className={styles.link}>
            <Link href="/recipe/Muffins">Muffins</Link>
          </p>
        </ul>
      </div>
    </Fragment>
  );
}
