import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react/cjs/react.production.min";
import styles from "../styles/RecipeMaker.module.css";
import { useSession, getSession } from "next-auth/react";

export default function RecipeMaker() {
  const router = useRouter();
  const addRecipe = async (event) => {
    if (
      event.target.title.value != "" &&
      event.target.desc.value != "" &&
      event.target.image.value != ""
    ) {
      event.preventDefault();
      const res = await fetch("/api/postRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: event.target.title.value,
          user: session.user.name,
          email: session.user.email,
          image: event.target.image.value,
          desc: event.target.desc.value,
        }),
      });
    } else {
      alert("Cannot leave fields blank");
    }
    router.push("/dashboard");
  };

  const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  if (status === "unauthenticated") {
    return <h1>You must login to post a recipe</h1>;
  }

  return (
    <Fragment>
      <Head>
        <title>New Recipe</title>
        <meta name="description" content="Publish your recipe here." />
      </Head>
      <h1 className={styles.title}>New Recipe</h1>
      <form className={styles.main} onSubmit={addRecipe}>
        <label>
          Title
          <input name="title" type="text" className={styles.inputBox} />
        </label>
        <label>
          Image Link
          <input name="image" type="text" className={styles.inputBox} />
        </label>
        <label>
          Description
          <textarea name="desc" type="text" className={styles.inputBox} />
        </label>
        <button type="submit">Publish</button>
      </form>
    </Fragment>
  );
}
