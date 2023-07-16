import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await serverAuth(req)

        const movies = await prisma.movie.findMany()

        return new NextResponse(JSON.stringify(movies), {
            status: 200
        })

    } catch(err) {
        console.log(err)
        return new NextResponse("Something went wrong!", {
            status: 400
        })
    }
}