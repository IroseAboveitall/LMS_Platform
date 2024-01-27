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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title cannot be empty",
  }),
});

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  // Initialize the useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  // Extract the states from the useForm hook instance
  const { isSubmitting, isValid } = form.formState;

  // Create the onSubmit function handler to call the API to submit the inputs.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button
          variant="ghost"
          className="hover:bg-slate-300 flex justify-center mr-2"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit Title
        </Button>
      </div>
    </div>
  );
};
