import { Recipe } from "@prisma/client";
import Link from "next/link";

const Card = (props: { recipe: Recipe }) => {
  return (
    <>
      <Link
        href={"/recipe/" + props.recipe.user + "/" + props.recipe.title + ""}
      >
        <div
          key={props.recipe.title}
          className="max-w-sm rounded overflow-hidden shadow-lg p-1 hover:cursor-pointer m-2 bg-white"
        >
          <img className="w-80 object-cover h-80" src={props.recipe.image} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{props.recipe.title}</div>
            <p className="text-gray-700 text-base">
              Rating: {props.recipe.rating}
            </p>
            <p className="text-gray-700 text-base">
              {props.recipe.description}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Card;
