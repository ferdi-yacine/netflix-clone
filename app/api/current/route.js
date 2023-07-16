import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const { currentUser } = await serverAuth(req)

        return new NextResponse(currentUser, {
            status: 200
        })
    } catch(err) {
        console.log(err)
        return new NextResponse(err, {
            status: 400
        })
    }
}