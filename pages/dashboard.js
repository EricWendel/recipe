import { useSession, getSession } from "next-auth/react";
import { Fragment } from "react";

export default function dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <h1>You must login to view your dashboard</h1>;
  }

  return (
    <Fragment>
      <h1>Welcome {session.user.name}</h1>
      <p>This is your dashboard</p>
    </Fragment>
  );
}
