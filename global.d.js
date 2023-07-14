import { PrismaClient } from "@prisma/client";

global.prismadb = null; // Declare the global variable

// TypeScript's `declare global` is not needed in JavaScript

// Set the global variable if it doesn't exist or create a new PrismaClient instance
const client = global.prismadb || new PrismaClient();

// Assign the PrismaClient instance to the global variable
global.prismadb = client;

// Export the global variable
export default client;