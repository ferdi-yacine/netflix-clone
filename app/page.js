"use client";

import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const { data: movies = [] } = useMovieList() 
  const { data: favorites = [] } = useFavorites() 
  const { isOpen, closeModal } = useInfoModal()


  if (session.status === "loading") {
    return <Loading />;
  }
  if (session.status === "unauthenticated") {
    router.push("/auth");
  }
  if (session.status === "authenticated") {

   

    return (
      <>
        <InfoModal visible={isOpen} onClose={closeModal} />
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
