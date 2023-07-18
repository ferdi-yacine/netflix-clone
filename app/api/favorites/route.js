import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const { currentUser } = await serverAuth()
        const favoriteMovies = await prisma.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds
                }
            }
        })

        return new NextResponse(JSON.stringify(favoriteMovies), {
            status: 200
        })

    } catch(err) {
        console.log(err)
        return new NextResponse(err, {
            status: 400
        })
    }
}