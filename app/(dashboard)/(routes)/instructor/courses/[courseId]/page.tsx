import { AttachmentForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/_components/attachment-form";
import { CategoryForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/_components/category-form";
import { DescriptionForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/_components/description-form";
import { ImageForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/_components/image-form";
import { PriceForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/_components/price-form";
import { TitleForm } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/_components/title-form";
import { IconComp } from "@/components/icon-comp";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  //  👇 If the user is NOT logged in and the user enters the URL corresponding to a course, redirect them back to the Home Page.

  // Check if userId is present or not i.e. if the user is logged in or not
  if (!userId) {
    return redirect("/"); // Redirect back to the Root Page i.e. the Home Page
  }

  //  👇 If the user is logged in but course was deleted earlier and now the user enters the URL corresponding to the that deleted course, redirect back to the Home Page ( After checking that no course exists in the DB )

  // Fetch the course along with the attachments
  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  //Here, attachments is a related model or table associated with the course model. The include property is used to specify related models that you want to retrieve along with the main model. In this case, it's asking to include the attachments associated with the course.

  // Fetch the categories ( So that it can be used to pass its fields as props to the Category Form Component )
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const modifiedCategories = categories.map((item) => ({
    value: item.name.toLowerCase().replace(/\s/g, ""),
    label: item.name,
    categoryId: item.id,
  }));

  // console.log(newCategories);

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
        {/* 👇 This is the container for the left side of the courseId page for md screens and larger */}
        <div>
          <div className="flex items-center gap-x-2">
            <IconComp icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          {/* <DescriptionForm initialData={course} courseId={course.id} /> */}
          <DescriptionForm
            // initialData={{ ...course, description: course.description! }}
            initialData={course}
            courseId={course.id}
          />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            // options={categories.map((category) => ({
            //   label: category.name,
            //   value: category.id,
            // }))}
            options={modifiedCategories}
          />
        </div>

        {/* 👇 This is the container for Right side of the courseId page for md screens and larger*/}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconComp icon={ListChecks} />
              <h2 className="text-xl">Course Chapters</h2>
            </div>
            <div>TODO: Chapters </div>
          </div>

          {/* Container for the Price Form */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconComp icon={CircleDollarSign} />
              <h2 className="text-xl">Offer your Course at a Price</h2>
            </div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>

          {/* Container for the Attachment Form */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconComp icon={File} />
              <h2 className="text-xl">Resources for the course</h2>
            </div>
            <AttachmentForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
