import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId)
      return new NextResponse("Unauthorized access", { status: 401 });

    // Check if the user who is trying to publish the chapter is the owner of the course
    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });

    if (!courseOwner)
      return new NextResponse("Unauthorized access", { status: 401 });

    // Find the chapter that we are trying to publish
    const chapter = await db.chapter.findUnique({
      where: { id: params.chapterId, courseId: params.courseId },
    });

    // Find the Mux Data
    const muxData = await db.muxData.findUnique({
      where: { chapterId: params.chapterId },
    });

    // All of these are required in order for the user to publish the chapter
    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ){
      return new NextResponse("Missing required fields", { status: 400 });
    }
    
    const publishedChapter = await db.chapter.update({
      where: { id: params.chapterId, courseId: params.courseId },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
