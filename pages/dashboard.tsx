import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { prisma } from "../db/index";
import { GetServerSideProps, NextPage } from "next";
import { Recipe } from "@prisma/client";

const Dashboard: NextPage<{ recipes: Recipe[] }> = ({ recipes }) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="View and publish new recipes!" />
        </Head>
        <Navbar />
        <h1 className="">Loading...</h1>
      </div>
    );
  }
  //Not logged in
  if (status === "unauthenticated") {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="View and publish new recipes!" />
        </Head>
        <Navbar />
        <div className="bg-gray-100">
          <h1 className="flex justify-center text-6xl my-6 text-center">
            You must login to view your dashboard
          </h1>
        </div>
      </div>
    );
  }
  // Logged in
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="View and publish new recipes!" />
      </Head>
      <Navbar />
      <h1 className="flex justify-center text-6xl my-6">
        Welcome {session.user.name}
      </h1>
      <div className="flex justify-center my-10">
        <button className="h-10 px-6 font-semibold rounded-lg border border-gray-500">
          <Link href="/recipeMaker">Make a Recipe</Link>
        </button>
      </div>
      <div className="flex justify-center mt-6">
        <div>
          <h1 className="flex justify-center text-4xl bold font-bold">
            Your Recipes
          </h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {recipeCards(recipes)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

function recipeCards(recipes: Recipe[]) {
  return recipes.map((r) => {
    return <Card recipe={r} key={r.title} />;
  });
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session === null) {
    return { props: {} };
  }
  const recipes: Recipe[] = await prisma.recipe.findMany({
    where: {
      user: session.user.name,
    },
    take: 20,
    orderBy: { rating: "desc" },
  });
  return { props: { recipes } };
};
