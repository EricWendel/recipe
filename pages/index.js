import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react/cjs/react.production.min";
import Login from "./components/Login.js";
import { prisma } from "../db/index.ts";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="View and publish new recipes!" />
      </Head>
      <Navbar />
      <div className="flex justify-center mt-6">
        <div>
          <h1 className="flex justify-center text-4xl bold font-bold">
            Top 5 Recipes
          </h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {recipeCards(props)}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function recipeCards(props) {
  return props.list.map((r) => {
    let path = "/recipe/" + r[2] + "/" + r[3] + "";
    return (
      <Card title={r[0]} imglink={r[1]} desc={r[4]} path={path} rating={r[5]} />
    );
  });
}

export async function getServerSideProps() {
  let arr = [];
  const recipe = await prisma.recipe.findMany({
    take: 5,
    orderBy: { rating: "desc" },
  });
  recipe.forEach((curr) => {
    arr.push([
      curr.title,
      curr.image,
      curr.user,
      curr.recipeName,
      curr.description,
      curr.rating,
    ]);
  });
  return { props: { list: arr } };
}
