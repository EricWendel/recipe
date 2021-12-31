import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="flex justify-center text-teal-200">
          <p className="my-auto">{session.user.name}</p>
          <button
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-teal-200 border-teal-200 hover:border-transparent hover:text-teal-500 hover:bg-teal-200 mt-4 ml-4 md:mt-0"
            onClick={() => signOut("google")}
          >
            Sign out
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-center text-teal-200">
        <button
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-teal-200 border-teal-200 hover:border-transparent hover:text-teal-500 hover:bg-teal-200 mt-4 ml-4 md:mt-0"
          onClick={() => signIn("google")}
        >
          Sign in
        </button>
      </div>
    </>
  );
}
