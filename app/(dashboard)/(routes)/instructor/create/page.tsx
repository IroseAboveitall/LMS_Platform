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
import Link from "next/link";

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
  // const onSubmit = (data: z.infer<typeof formSchema>) => {
  //   console.log(data);
  // };
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Provide a course name</h1>
        <p className="text-sm text-slate-600">
          Designate a Title for Your Course. Don't worry you can change this
          later.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. C++ for Beginners"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you Instruct in this Course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button
                  type="button"
                  variant="ghost"
                  className="hover:bg-[#ff7d8e] hover:text-white"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                className="bg-[#182B48] hover:bg-[#234661]"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
