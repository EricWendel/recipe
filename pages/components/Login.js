import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

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
            <img
              className="h-6 rounded"
              src="data:image/png;base64,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"
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
          <img
            className="ml-2 h-6"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
          />
        </button>
      </div>
    </>
  );
}
