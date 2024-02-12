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

    const unpublishedChapter = await db.chapter.update({
      where: { id: params.chapterId, courseId: params.courseId },
      data: {
        isPublished: false,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: { courseId: params.courseId, isPublished: true },
    });

    // After unpublishing the above chapter, if there are no more chapters published for the course, then unpublish the course
    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: { id: params.courseId },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
