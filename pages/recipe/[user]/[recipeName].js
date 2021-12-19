import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";
import { MongoClient } from "mongodb";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.recipeName}</title>
        <meta name="description" content="A new recipe to try today!" />
      </Head>
      <div>
        <h1>{props.recipeName}</h1>
        <p>Posted by: {props.user}</p>
        <img src={props.image} />
        <p>{props.desc}</p>
      </div>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const collection = db.collection("recipes");
  const recipes = await collection
    .find({}, { recipeName: 1, user: 1 })
    .toArray();
  client.close();

  return {
    fallback: "blocking", // true: allow any path, false: 404 error for other paths
    paths: recipes.map((recipe) => ({
      params: { recipeName: recipe.recipeName, user: recipe.user },
    })),
  };
}

export async function getStaticProps(context) {
  const recipeName = context.params.recipeName;
  const user = context.params.user;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const collection = db.collection("recipes");
  const recipe = await collection.findOne({
    recipeName: recipeName,
    user: user,
  });
  if (!recipe) {
    client.close();
    return {
      props: {
        title: "Page not found",
        recipeName: "PageNotFound",
        user: "404",
        image: "404",
        desc: "404",
      },
      revalidate: 1,
    };
  } else {
    client.close();
    return {
      props: {
        title: recipe.title,
        recipeName: recipe.title.replace(/ /g, ""),
        user: recipe.user,
        image: recipe.image,
        desc: recipe.desc,
      },
      revalidate: 1,
    };
  }
}
