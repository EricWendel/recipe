import Head from "next/head";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import { Recipe } from "@prisma/client";
import { FormEvent, useState } from "react";

const RecipeMaker = () => {
  const router = useRouter();
  const addRecipe = async (event) => {
    if (
      event.target.title.value != "" &&
      event.target.desc.value != "" &&
      event.target.image.value != ""
    ) {
      event.preventDefault();
      let r: Recipe = {
        id: undefined,
        title: event.target.title.value,
        recipeName: event.target.title.value.replace(/ /g, ""),
        user: session.user.name,
        email: session.user.email,
        image: event.target.image.value,
        description: event.target.desc.value,
        rating: 0,
      };
      const res = await fetch("/api/postRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ r }),
      });
    } else {
      alert("Cannot leave fields blank");
    }
    router.push("/dashboard");
  };

  const { data: session, status } = useSession();

  const [imgSource, setImgSource] = useState<string>();

  const handleOnChange = (changeEvent) => {
    console.log("change");
    const reader = new FileReader();
    reader.onload = (onLoadEvent) => {
      let res = onLoadEvent.target.result;
      if (typeof res !== "string") {
        res = res.toString();
      }
      setImgSource(res);
    };
    if (changeEvent.target.files[0] === undefined) {
      setImgSource("");
    } else {
      reader.readAsDataURL(changeEvent.target.files[0]);
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <h1 className="flex justify-center text-6xl my-6 text-center">
          You must login to post a recipe
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>New Recipe</title>
        <meta name="description" content="Publish your recipe here." />
      </Head>
      <Navbar />
      <h1 className="text-center text-4xl m-6">New Recipe</h1>
      <div className="w-full flex justify-center">
        <form
          className="border border-gray-500 p-10 shadow-lg w-11/12 md:w-1/2 lg:w-1/3 rounded-md bg-white"
          onSubmit={addRecipe}
        >
          <label className="text-md">Title</label>
          <input
            name="title"
            type="text"
            className="border border-gray-500 p-1 w-full mb-6  shadow-md rounded-md focus:outline-none focus:border-teal-400 focus:ring-2"
          />
          <label className="text-md">Image Link</label>
          <input
            name="image"
            type="text"
            className="border border-gray-500 p-1 w-full mb-6  shadow-md rounded-md focus:outline-none focus:border-teal-400 focus:ring-2"
          />
          <label className="text-md">Image Upload</label>
          <input
            onChange={handleOnChange}
            name="file"
            type="file"
            className="border border-gray-500 p-1 w-full mb-6  shadow-md rounded-md focus:outline-none focus:border-teal-400 focus:ring-2"
          />
          <img src={imgSource} alt="" />
          <label className="text-md">Description</label>
          <textarea
            name="desc"
            className="border border-gray-500 p-1 w-full mb-6  shadow-md rounded-md focus:outline-none focus:border-teal-400 focus:ring-2"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="h-10 px-6 font-semibold rounded-lg border border-gray-500 w-1/2"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RecipeMaker;
