"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  console.log(session)
  if (session.status === "loading") {
    return <p>Loading ...</p>;
  }
  if (session.status === "unauthenticated") {
    router.push("/auth");
  }
  if (session.status === "authenticated") {
    return (
      <>
        <h1 className="text-green-400">Hello Netflix</h1>
        <p className="text-white">Logged in as : {session?.data?.user?.name}</p>
        <button className="h-10 w-full bg-white" onClick={() => signOut()}>
          Logout
        </button>
      </>
    );
  }
}
