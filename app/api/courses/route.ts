import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Extract the user id using clerk API
    const { userId } = auth();

    const { title } = await req.json();

    if (!userId)
      return new NextResponse("Unauthorized to access", { status: 401 });

    // Create a course inside the DB
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    // All the other fields are optional in Course model

    return NextResponse.json(course);
  } catch (error) {
    console.log("[Courses]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
