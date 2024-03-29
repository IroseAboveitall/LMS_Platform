import { ChapterAccessForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/chapters/[chapterId]/_components/chapter-access-form";
import { ChapterActions } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/chapters/[chapterId]/_components/chapter-actions";
import { ChapterDescriptionForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/chapters/[chapterId]/_components/chapter-description-form";
import { ChapterTitleForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/chapters/[chapterId]/_components/chapter-title-form";
import { ChapterVideoForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/chapters/[chapterId]/_components/chapter-video-form";
import { Banner } from "@/components/banner";
import { IconComp } from "@/components/icon-comp";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // Fetch the chapter from the DB specified in the URL parameters
  const chapter = await db.chapter.findUnique({
    where: { id: params.chapterId, courseId: params.courseId },
    include: { muxData: true },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  // https://chat.openai.com/share/ad2eaa0d-cae8-4573-bfa2-7fc95790daf9

  return (
    <>
      {/* 👇 Display the Banner when the Chapter is not published */}
      {!chapter.isPublished && (
        <Banner
          label="This chapter is unpublished. It will not be visible in the course."
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/instructor/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course Setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconComp icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconComp icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconComp icon={Video} />
              <h2 className="text-xl">Add a Video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
