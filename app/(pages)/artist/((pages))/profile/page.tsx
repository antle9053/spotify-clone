"use client";

import { Separator } from "@/app/_components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Image from "next/image";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB

const formSchema = z.object({
  username: z.string().min(2).max(50),
  about: z.string().optional(),
  cover: z
    .instanceof(Array<File>)
    .optional()
    .refine((file) => {
      return !file?.[0] || file?.[0].size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB"),
});

export default function ArtistProfilePage() {
  const [preview, setPreview] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      about: "",
      cover: undefined,
    },
  });

  const coverRef = form.register("cover");

  const onDrop = useCallback((acceptedFiles: any) => {
    const preview = URL.createObjectURL(
      acceptedFiles?.[0] as Blob | MediaSource
    );
    console.log(preview);
    setPreview(preview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-1">Profile</h1>
      <p className="text-white/70">
        This is how audience will see you on the site.
      </p>
      <Separator className="my-4 bg-white/10" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Artist name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    className="text-white border-white/20"
                    placeholder="Please enter your name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">About</FormLabel>
                <FormControl>
                  <Textarea
                    autoComplete="off"
                    className="text-white border-white/20 scrollbar resize-none"
                    placeholder="Please enter your description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>About you</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Cover image</FormLabel>
                <FormControl>
                  <div
                    className="w-full h-[300px] border border-solid border-white/20 rounded-md p-2"
                    {...getRootProps()}
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      multiple={false}
                      {...getInputProps()}
                      {...coverRef}
                    />
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Cover image preview"
                        width={0}
                        height={0}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center border border-dashed border-white/30">
                        <p className="text-muted-foreground text-sm">
                          Drag and drop some files here, or click to select
                          files
                        </p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="secondary" type="submit">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
}
