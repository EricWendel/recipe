import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react/cjs/react.production.min";
import styles from "../styles/Home.module.css";
import Login from "./components/Login.js";
import { MongoClient } from "mongodb";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="View and publish new recipes!" />
      </Head>
      <h1 className={styles.title}>Recipe Home</h1>
      <div className={styles.center}>
        <button className={styles.btn}>
          <Link href="/dashboard">Dashboard</Link>
        </button>
      </div>
      <div className={styles.center}>
        <Login />
        <h1>Top 5 Recipes</h1>
        {recipeCards(props)}
      </div>
    </Fragment>
  );
}

function recipeCards(props) {
  return props.list.map((r) => {
    let path = "/recipe/" + r[2] + "/" + r[3] + "";
    return (
      <Fragment>
        <h1 className={styles.link}>
          <Link href={path}>{r[0]}</Link>
          <img src={r[1]} className={styles.img} />
        </h1>
      </Fragment>
    );
  });
}

export async function getStaticProps(context) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const collection = db.collection("recipes");
  let arr = [];
  const recipe = await collection
    .find({})
    .limit(5)
    .forEach((curr) => {
      arr.push([curr.title, curr.image, curr.user, curr.recipeName]);
    });
  return { props: { list: arr } };
}
