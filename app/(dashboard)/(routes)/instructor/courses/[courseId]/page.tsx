import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
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

  const completionText = `(${completedFields} / ${totalFields})`;

  // TODO : Check that the person who is trying to edit this course is also the creator of this course

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
