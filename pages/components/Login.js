import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="flex justify-center">
          <a
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-gray-800 mt-4 md:mt-0"
            href="/dashboard"
          >
            <p className="float-left mr-2 my-1">{session.user.name}</p>
            <img className="ml-2 h-6 rounded-full" src={session.user.image} />
          </a>
          <button
            className="inline-block text-sm ml-2 px-2 py-2 leading-none border rounded text-white bg-gray-800 mt-4 md:mt-0"
            onClick={() => signOut("google")}
          >
            <img className="h-6 rounded" src="logout.png" />
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
          <img className="ml-2 h-6" src="googleLogo.png" />
        </button>
      </div>
    </>
  );
}
