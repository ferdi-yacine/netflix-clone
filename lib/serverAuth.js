import { getServerSession } from "next-auth";
import prisma from "./prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const serverAuth = async (req, res) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });
  
  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
}

export default serverAuth;
