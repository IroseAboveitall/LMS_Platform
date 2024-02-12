import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// ⭐⭐⭐ API to EDIT the course ⭐⭐⭐
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } } // This should be the 2nd parameter
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    const data = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.update({
      where: { id: courseId, userId },
      data: {
        ...data,
      },
    });

    // Send the updated course to the Client Side
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
