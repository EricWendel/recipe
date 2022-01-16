import { Recipe } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const Card: NextPage<{ recipe: Recipe }> = ({ recipe }) => {
  if (!recipe) {
    return <></>;
  }
  return (
    <>
      <Link
        href={"/recipe/" + recipe.user + "/" + recipe.recipeName + ""}
        passHref
      >
        <div
          key={recipe.title}
          className="max-w-sm rounded overflow-hidden shadow-lg p-1 hover:cursor-pointer m-2 bg-white"
        >
          <Image
            className="w-80 object-cover h-80"
            height={320}
            width={320}
            src={recipe.image}
            alt={recipe.title}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{recipe.title}</div>
            <p className="text-gray-700 text-base">Rating: {recipe.rating}</p>
            <p className="text-gray-700 text-base">{recipe.description}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Card;
