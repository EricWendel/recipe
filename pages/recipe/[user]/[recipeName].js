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
      <div className="flex justify-center p-4">
        <div>
          <h1 className="text-6xl my-4">{props.recipeName}</h1>
          <div className="my-2 mx-1">
            <p className="text-xl">Posted by: {props.user}</p>
            <p className="text-xl">Rating: {props.rating}/5</p>
            <p className="text-m ml-6 my-4">{props.desc}</p>
          </div>
          <img className="max-h-80 rounded-xl object-cover" src={props.image} />
          <h1 className="text-4xl my-4">Ingredients...</h1>
          <h1 className="text-4xl my-4">Directions...</h1>
        </div>
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
        rating: 404,
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
        rating: recipe.rating,
      },
      revalidate: 1,
    };
  }
}
