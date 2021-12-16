import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react/cjs/react.production.min";
import styles from "../styles/RecipeMaker.module.css";

export default function RecipeMaker() {
  const router = useRouter();
  const addRecipe = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/postRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.target.title.value,
        user: event.target.user.value,
        image: event.target.image.value,
        desc: event.target.desc.value,
      }),
    });
    //const result = await res.json();
    //console.log(result);
    router.push("/");
  };

  return (
    <Fragment>
      <h1 className={styles.title}>New Recipe</h1>
      <form className={styles.main} onSubmit={addRecipe}>
        <label>
          Title
          <input name="title" type="text" className={styles.inputBox} />
        </label>
        <label>
          User
          <input name="user" type="text" className={styles.inputBox} />
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
