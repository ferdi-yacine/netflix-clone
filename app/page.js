"use client";

import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useMovieList from "@/hooks/useMovieList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const { data: movies = [] } = useMovieList() 

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
        <Billboard />
        <div className="pb-40">
          <MovieList title="Trending Now" data={movies}/>
        </div>
      </>
    );
  }
}
