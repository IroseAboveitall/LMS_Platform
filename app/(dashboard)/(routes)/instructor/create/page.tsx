"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// We could create this Schema in a file inside a folder schemas, so that it could be accessible from everywhere.
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreateCoursePage = () => {
  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // Extract the states from the form
  const { isSubmitting, isValid } = form.formState;

  // Write an onSubmit function
  const onSubmit =  (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (<div>Create a Course</div>);
  
}

export default CreateCoursePage;
