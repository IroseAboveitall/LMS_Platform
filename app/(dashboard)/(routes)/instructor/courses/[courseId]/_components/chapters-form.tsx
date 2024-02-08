"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Pencil, PlusCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { ChaptersList } from "@/app/(dashboard)/(routes)/instructor/courses/[courseId]/_components/chapters-list";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  // Initialize the useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // Extract the states from the useForm hook instance
  const { isSubmitting, isValid } = form.formState;

  // Create the onSubmit function handler to call the API to submit the inputs.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, data);
      toast.success("Chapter created successfully");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Well, this is awkward. Something went haywire.");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapters reordered successfully");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/instructor/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className=" relative mt-6 border bg-[#67ebf71f] rounded-md p-4">
      {/* 👇 When chapters are in reordering state do not let users do anything but show a loader icon*/}
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700 " />
        </div>
      )}

      {/* 👇 Container for the "Course Title" & the Button */}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button
          onClick={toggleCreating}
          variant="ghost"
          className="hover:bg-slate-300 flex justify-center mr-2"
        >
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {/* 👇 Display the form if user has clicked the "Add a Chapter" Button */}
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Chapter Intro Part 1'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="bg-[#0c0f2e] hover:bg-[#0c0f2ee0]"
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </form>
        </Form>
      )}

      {/* 👇 Display the list of Chapters if user has not clicked the "Add a Chapter" Button */}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {/*  If there are NO chapters : Display "No chapters" */}
          {!initialData.chapters.length && "No chapters"}

          {/*  If there are chapters : List out the only chapter or all the chapters */}
          <ChaptersList
            items={initialData.chapters || []}
            onReorder={onReorder}  // 👈 Pass the onReorder function handle definition as a prop 
            onEdit={onEdit}
          />
        </div>
      )}

      {/* 👇 Display a text to suggest that the user can drag to reorder the chapters */}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag to reorder chapters
        </p>
      )}
    </div>
  );
};
