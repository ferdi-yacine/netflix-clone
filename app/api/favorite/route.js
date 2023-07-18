import { without } from "lodash";
import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const { currentUser } = await serverAuth()

        const { movieId } = await req.json()

        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if (!existingMovie) {
            throw new Error("Invalid ID")
        }

        const user = await prisma.user.update({
            where: {
                email: currentUser.email
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        })
        return new NextResponse(JSON.stringify(user), {
            status: 200
        })

    } catch(err) {
        console.log(err)
        return new NextResponse(err.message, {
            status: 400
        })
    }
}


export const DELETE = async (req) => {
    try {
        const { currentUser } = await serverAuth()

        const { movieId } = await req.json()

        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if (!existingMovie) {
            throw new Error("Invalid ID")
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

        const updatedUser = await prisma.user.update({
            where: {
                email: currentUser.email
            },
            data: {
                favoriteIds: updatedFavoriteIds
            }
        })
        return new NextResponse(JSON.stringify(updatedUser), {
            status: 200
        })

    } catch(err) {
        console.log(err)
        return new NextResponse(err.message, {
            status: 400
        })
    }
}


