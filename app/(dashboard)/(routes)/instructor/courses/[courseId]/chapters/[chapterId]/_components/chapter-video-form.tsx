"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  // Create the onSubmit function handler to call the API to submit the inputs.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, data);
      toast.success("Chapter updated successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Well, this is awkward. Something went haywire.");
    }
  };

  return (
    <div className="mt-6 border bg-[#67ebf71f] rounded-md p-4">
      {/* 👇 Container for the "Chapter Video" & the Button */}
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button
          onClick={toggleEdit}
          variant="ghost"
          className="hover:bg-slate-300 flex justify-center mr-2"
        >
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>

      {/* 👇 Display the current Course Video if user has not clicked the "Change Image" Button */}
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="mt-4 flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            Video uploaded!
            {/* TODO : Actual Video Player */}
          </div>
        ))}

      {/* 👇 Display the Video Upload from UploadThing if user has clicked the "Edit Video/Add a video" Button */}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this Chapter's Video
          </div>
        </div>
      )}
      {/* 👇 Show a message to the user who is editing */}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Video's can take a few minutes to process. Refresh the page if the
          video doesn't appear.
        </div>
      )}
    </div>
  );
};
