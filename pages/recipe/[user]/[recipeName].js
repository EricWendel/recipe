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
  const client = await MongoClient.connect(
    "mongodb+srv://" +
      process.env.DBUSER +
      ":" +
      process.env.DBPASS +
      "@" +
      process.env.DBNAME +
      ".xrcz2.mongodb.net/recipes?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("recipes");
  const recipes = await collection
    .find({}, { recipeName: 1, user: 1 })
    .toArray();
  client.close();

  return {
    fallback: false, // true: allow any path, false: 404 error for other paths
    paths: recipes.map((recipe) => ({
      params: { recipeName: recipe.recipeName, user: recipe.user },
    })),
  };
}

export async function getStaticProps(context) {
  const recipeName = context.params.recipeName;
  const user = context.params.user;

  const client = await MongoClient.connect(
    "mongodb+srv://" +
      process.env.DBUSER +
      ":" +
      process.env.DBPASS +
      "@" +
      process.env.DBNAME +
      ".xrcz2.mongodb.net/recipes?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("recipes");
  const recipe = await collection.findOne({
    recipeName: recipeName,
    user: user,
  });
  client.close();
  console.log(recipe);

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
