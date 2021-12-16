import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.recipeName}</title>
        <meta name="description" content="A new recipe to try today!" />
      </Head>
      <div>
        <h1>{props.recipeName}</h1>
        <p>{props.userName}</p>
      </div>
    </Fragment>
  );
}

export async function getStaticPaths() {
  return {
    fallback: true, // true: allow any path, false: 404 error for other paths
    paths: [
      // these are pre loaded, faster than other paths
      {
        params: {
          recipeName: "ChickenSandwich",
          userName: "Eric",
        },
      },
      {
        params: {
          recipeName: "ApplePie",
          userName: "Eric",
        },
      },
      {
        params: {
          recipeName: "Muffin",
          userName: "Eric",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const recipeName = context.params.recipeName;
  const userName = context.params.userName;

  return {
    props: {
      recipeName: recipeName,
      userName: userName,
    },
  };
}
