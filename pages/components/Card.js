import Link from "next/link";

export default function Card(props) {
  return (
    <>
      <Link href={props.path}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-1 hover:cursor-pointer m-2">
          <img className="w-full" src={props.imglink} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{props.title}</div>
            <p className="text-gray-700 text-base">Rating: {props.rating}</p>
            <p className="text-gray-700 text-base">{props.desc}</p>
          </div>
        </div>
      </Link>
    </>
  );
}