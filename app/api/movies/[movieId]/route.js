import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req, {params}) => {
    try {
        await serverAuth()

        const { movieId } = params;

        if (!movieId) {
            throw new Error("Invalid ID")
        }

        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if (!movie) {
            throw new Error("Invalid ID")
        }

        return new NextResponse(JSON.stringify(movie), {
            status: 200
        })
    } catch(err) {
        console.log(err)
        return new NextResponse(err.message, {
            status: 400
        })
    }
}