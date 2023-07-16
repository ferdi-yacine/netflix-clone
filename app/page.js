"use client";

import Navbar from "@/components/Navbar";
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
        <Navbar />
      </>
    );
  }
}
