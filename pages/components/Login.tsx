import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Login: NextPage = (props) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="flex justify-center cursor-pointer">
          <Link href="/dashboard" passHref>
            <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-gray-800 mt-4 md:mt-0">
              <p className="float-left mr-2 my-1">{session.user.name}</p>
              <Image
                className="ml-2 h-6 rounded-full"
                height={24}
                width={24}
                src={session.user.image}
                alt="user img"
              />
            </div>
          </Link>
          <button
            className="inline-block text-sm ml-2 px-2 py-2 leading-none border rounded text-white bg-gray-800 mt-4 md:mt-0"
            onClick={() => signOut()}
          >
            <Image
              className="h-6 rounded"
              height={24}
              width={24}
              src="/logout.png"
              alt="logout"
            />
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-center">
        <button
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-gray-800 mt-4 md:mt-0"
          onClick={() => signIn("google")}
        >
          <p className="float-left mr-2 my-1">Sign in</p>
          <Image
            className="ml-2 h-6"
            height={24}
            width={24}
            src="/googleLogo.png"
            alt="google"
          />
        </button>
      </div>
    </>
  );
};
export default Login;
