import { PrismaClient } from '@prisma/client';

// Declare "cachedPrisma" in the Global Scope
declare global {
  var cachedPrisma: PrismaClient;  // cachedPrisma is declared to be of type PrismaClient
}

// Declare "prisma" locally
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis.cachedPrisma) {
    globalThis.cachedPrisma = new PrismaClient();
		//👆  Only if globalThis.cachedPrisma is not defined, create a new instance of PrismaClient()
  }
  prisma = globalThis.cachedPrisma;
	// 👆 In a non-production environment, the same PrismaClient instance is reused across different parts
  // of your application, which can be more efficient and prevent resource leaks.
}

export const db = prisma;


// 👇👇👇 ANOTHER WAY 
// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
