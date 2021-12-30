import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";
import { prisma } from "../../../db/index.ts";

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
  const recipes = await prisma.recipe.findMany();

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

  const recipe = await prisma.recipe.findFirst({
    where: {
      recipeName: recipeName,
      user: user,
    },
  });

  if (!recipe) {
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
    return {
      props: {
        title: recipe.title,
        recipeName: recipe.title.replace(/ /g, ""),
        user: recipe.user,
        image: recipe.image,
        desc: recipe.description,
      },
      revalidate: 1,
    };
  }
}
