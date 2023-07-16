"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profiles = () => {
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
      <div className="flex  items-center h-full justify-center">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-6xl text-white text-center">
            Who is watching?
          </h1>
          <div className="flex items-center justify-center gap-8 mt-10">
            <div onClick={() => router.push("/")}>
              <div className="group flex-row w-44 mx-auto">
                <div className="relative w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                  <Image src="/images/default-red.png" fill={true} alt="Profile" />
                </div>
                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{session?.data?.user?.name || "John Doe"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profiles;
