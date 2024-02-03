"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  // Create the onSubmit function handler to call the API to submit the inputs.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);
      toast.success("Course updated successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Well, this is awkward. Something went haywire.");
    }
  };

  return (
    <div className="mt-6 border bg-[#67ebf71f] rounded-md p-4">
      {/* 👇 Container for the "Course Image" & the Button */}
      <div className="font-medium flex items-center justify-between">
        Course attachmenmts
        <Button
          onClick={toggleEdit}
          variant="ghost"
          className="hover:bg-slate-300 flex justify-center mr-2"
        >
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>

      {/* 👇 Display the current Course Image if user has not clicked the "Change Image" Button */}
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
        </>
      )}

      {/* 👇 Display the form if user has clicked the "Edit Description" Button */}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Include any materials necessary for your students to successfully
            finish the course.
          </div>
        </div>
      )}
    </div>
  );
};
