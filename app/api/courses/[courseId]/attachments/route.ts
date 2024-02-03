import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    // Check if the user who is trying to add an attachment for this course is the owner of the course
    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: { url, name: url.split("/").pop(), courseId: params.courseId },
    });

    // name :  extracting the last segment of the URL (likely a filename) and using it as the name property when creating a new attachment in a database.

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
