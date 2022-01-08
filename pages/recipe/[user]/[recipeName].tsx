import Head from "next/head";
import { prisma } from "../../../db/index";
import Navbar from "../../components/Navbar";
import { GetStaticProps, NextPage } from "next";
import { Recipe } from "@prisma/client";
import { ParsedUrlQuery } from "querystring";

const recipePage: NextPage<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>{recipe.title}</title>
        <meta name="description" content="A new recipe to try today!" />
      </Head>
      <Navbar />
      <div className="flex justify-center p-4">
        <div>
          <h1 className="text-6xl mb-4">{recipe.title}</h1>
          <div className="my-2 mx-1">
            <p className="text-xl">Posted by: {recipe.user}</p>
            <p className="text-xl">Rating: {recipe.rating}/5</p>
            <p className="text-m my-4">{recipe.description}</p>
          </div>
          <img
            className="max-h-80 rounded-xl object-cover shadow-md"
            src={recipe.image}
          />
          <h1 className="text-4xl my-4">Ingredients...</h1>
          <h1 className="text-4xl my-4">Directions...</h1>
        </div>
      </div>
    </div>
  );
};
export default recipePage;

export const getStaticPaths = async () => {
  const recipes = await prisma.recipe.findMany();

  return {
    fallback: "blocking", // true: allow any path, false: 404 error for other paths
    paths: recipes.map((r) => ({
      params: { recipeName: r.recipeName, user: r.user },
    })),
  };
};

// to fix typescript error when getting dynamic path name
interface Params extends ParsedUrlQuery {
  recipeName: string;
  user: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { user, recipeName } = context.params as Params;
  let recipe = await prisma.recipe.findFirst({
    where: {
      recipeName: recipeName,
      user: user,
    },
  });

  if (recipe === null) {
    recipe = {
      id: null,
      title: "Page not found",
      recipeName: "PageNotFound",
      user: "404",
      email: "404",
      image: "404",
      description: "404",
      rating: 404,
    };
    return {
      props: { recipe },
      revalidate: 1,
    };
  } else {
    return {
      props: { recipe },
      revalidate: 1,
    };
  }
};
