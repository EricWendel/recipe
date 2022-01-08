import Head from "next/head";
import { prisma } from "../db/index";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card";
import { GetServerSideProps, NextPage } from "next";
import { Recipe } from "@prisma/client";

const Home: NextPage<{ recipes: Recipe[] }> = ({ recipes }) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Recipes</title>
        <meta name="description" content="View and publish new recipes!" />
      </Head>
      <Navbar />
      <div className="flex justify-center mt-6">
        <div>
          <h1 className="flex justify-center text-4xl bold font-bold">
            Top Recipes
          </h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {recipeCards(recipes)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

function recipeCards(recipes: Recipe[]) {
  return recipes.map((r) => {
    return <Card recipe={r} key={r.title} />;
  });
}

export const getServerSideProps: GetServerSideProps = async () => {
  const recipes: Recipe[] = await prisma.recipe.findMany({
    take: 10,
    orderBy: { rating: "desc" },
  });
  return { props: { recipes } };
};
