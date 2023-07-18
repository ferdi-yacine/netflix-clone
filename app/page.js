"use client";

import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const { data: movies = [] } = useMovieList() 
  const { data: favorites = [] } = useFavorites() 


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
          <MovieList title="My List" data={favorites}/>
        </div>
      </>
    );
  }
}
