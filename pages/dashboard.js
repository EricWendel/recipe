import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import Head from "next/head";
import Navbar from "./components/Navbar";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="View and publish new recipes!" />
        </Head>
        <Navbar />
        <h1 className="">Loading...</h1>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="View and publish new recipes!" />
        </Head>
        <Navbar />
        <div className="bg-gray-100">
          <h1 className="flex justify-center text-6xl my-6 text-center">
            You must login to view your dashboard
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="View and publish new recipes!" />
      </Head>
      <Navbar />
      <h1 className="flex justify-center text-6xl my-6">
        Welcome {session.user.name}
      </h1>
      <div className="flex justify-center my-10">
        <button className="h-10 px-6 font-semibold rounded-lg border border-gray-500">
          <Link href="/recipeMaker">Make a Recipe</Link>
        </button>
      </div>
    </div>
  );
}
