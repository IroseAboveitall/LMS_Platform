import { IconComp } from "@/components/icon-comp";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  // Check if userId is present or not i.e. if the user is logged in or not
  if (!userId) {
    return redirect("/"); // Redirect back to the Root Page i.e. the Home Page
  }

  // Fetch the course
  const course = await db.course.findUnique({
    where: { id: params.courseId },
  });

  // Check if the course exists
  if (!course) {
    return redirect("/"); // Redirect back to the Home Page
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  // TODO : Check that the person who is trying to edit this course is also the creator of this course

  return (
    <div className="p-6">
      {/* 👇 Title */}
      <div className="flex items-center justify-between">
        {/* 👈 This is the container to center its only child which is the container div below*/}
        <div className="flex flex-col gap-y-2">
          {/* 👈 This is the container for h1 & span*/}
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>

      {/* 👇 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconComp icon={Pencil} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
