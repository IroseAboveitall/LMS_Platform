"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PlusCircle } from "lucide-react";

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

  return (
    <div className="mt-6 border bg-[#67ebf71f] rounded-md p-4">
      {/* 👇 Container for the "Course Title" & the Button */}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button
          onClick={toggleCreating}
          variant="ghost"
          className="hover:bg-slate-300 flex justify-center mr-2"
        >
          {/* 👇 Using Ternary operator instead ( This is just another way of conditional rendering ) */}
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
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          <ChaptersList
            items={initialData.chapters || []}
            onReorder={() => {}}
            onEdit={() => {}}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag to reorder chapters
        </p>
      )}
    </div>
  );
};
