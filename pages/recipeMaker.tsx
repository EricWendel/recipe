import Head from "next/head";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import { Recipe } from "@prisma/client";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";

const RecipeMaker = (props) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [imgSource, setImgSource] = useState<string>("/uploadImage.png");
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleOnChange = (event) => {
    const reader = new FileReader();
    reader.onload = (onLoadEvent) => {
      setImgSource(onLoadEvent.target.result as string);
    };
    if (event.target.files[0] !== undefined) {
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setImgSource("/uploadImage.png");
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from<HTMLFormElement>(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    console.log(fileInput);
    if (fileInput != undefined) {
      for (const file of fileInput.files) {
        formData.append("file", file);
        console.log(file);
      }
    }
    formData.append("upload_preset", "recipe-images");
    const data = await fetch(props.CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    }).then((r) => r.json());
    console.log(data.secure_url);
    const r: Recipe = {
      id: undefined,
      title: title,
      recipeName: title.replace(/ /g, ""),
      user: session.user.name,
      email: session.user.email,
      image: data.secure_url,
      description: description,
      rating: 0,
    };
    const res = await fetch("/api/postRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ r }),
    });
    router.push("/dashboard");
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
          onSubmit={handleOnSubmit}
        >
          <label className="text-md">Title</label>
          <input
            name="title"
            type="text"
            className="border border-gray-500 p-1 w-full mb-6  shadow-md rounded-md focus:outline-none focus:border-teal-400 focus:ring-2"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-md">Image Upload</label>
          <input
            onChange={handleOnChange}
            accept=".jpg, .png, .jpeg"
            name="file"
            type="file"
            className="border border-gray-500 p-1 w-full mb-6  shadow-md rounded-md focus:outline-none focus:border-teal-400 focus:ring-2"
          />
          <img src={imgSource} alt="" />
          <label className="text-md">Description</label>
          <textarea
            name="desc"
            className="border border-gray-500 p-1 w-full mb-6  shadow-md rounded-md focus:outline-none focus:border-teal-400 focus:ring-2"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="h-10 px-6 font-semibold rounded-lg border border-gray-500 w-1/2"
              disabled={
                imgSource === "/uploadImage.png" || !description || !title
              }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    },
  };
};
