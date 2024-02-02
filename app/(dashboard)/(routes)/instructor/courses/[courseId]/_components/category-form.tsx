"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

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
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string; categoryId: string }[]; // 👈👈👈 Match combobox prop "options"
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  // Initialize the useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  });

  // Extract the states from the useForm hook instance
  const { isSubmitting, isValid } = form.formState;

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

  // 👇 Store the selected option ( which is an object) for which the
  const selectedOption = options.find(
    (option) => option.categoryId === initialData.categoryId
  );

  return (
    <div className="mt-6 border bg-[#67ebf71f] rounded-md p-4">
      {/* 👇 Container for the "Course Title" & the Button */}
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button
          onClick={toggleEdit}
          variant="ghost"
          className="hover:bg-slate-300 flex justify-center mr-2"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>

      {/* 👇 Display the selected Option Category if user has not clicked the "Edit Category" Button */}
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No category"}
        </p>
      )}

      {/* 👇 Display the form if user has clicked the "Edit Description" Button */}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={options}
                      categoryId={field.value} // 👈 This is just binding the categoryId prop of Combobox to the value property of the field object
                      onChange={field.onChange} // 👈 This is just binding the onChange prop of Combobox to the onChange handler of the field object
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                className="bg-[#0c0f2e] hover:bg-[#0c0f2ee0]"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
