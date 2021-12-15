export default function Home(props) {
  return (
    <div>
      <h1>{props.recipeId}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    fallback: true, // true: allow any path, false: 404 error for other paths
    paths: [
      // these are pre loaded, faster than other paths
      {
        params: {
          recipeId: "ChickenSandwich",
        },
      },
      {
        params: {
          recipeId: "ApplePie",
        },
      },
      {
        params: {
          recipeId: "Muffin",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const recipeId = context.params.recipeId;

  return {
    props: {
      recipeId: recipeId,
    },
  };
}
