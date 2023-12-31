import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req) => {

    try {
        await serverAuth(req)

        const movieCount = await prisma.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount)

        const randomMovies = await prisma.movie.findMany({
            take: 1,
            skip: randomIndex
        });
        
        return new NextResponse(JSON.stringify(randomMovies[0]), {
            status: 200
        })
    } catch(err) {
        console.log(err)
        return new NextResponse("Something went wrong!", {
            status: 400
        })
    }
}