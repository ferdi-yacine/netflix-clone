// import prismadb from "@/libs/prismadb";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export const POST = async (request) => {
  const { name, email, password } = await request.json();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse("Email already taken", {
        status: 422,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return new NextResponse("User has been created!", {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
