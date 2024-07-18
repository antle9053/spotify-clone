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
import { InputSingleFile } from "@/app/_components/others/InputSingleFile";
import { useArtistProfile } from "@/app/_hooks/useArtistProfile";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB

const formSchema = z.object({
  username: z.string().min(2).max(50),
  about: z.string().optional(),
  cover: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB"),
});

export default function ArtistProfilePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      about: "",
      cover: undefined,
    },
  });

  const { updateProfile } = useArtistProfile();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateProfile(values);
  };

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
                  <InputSingleFile
                    accept="image/*"
                    setValue={(value) => form.setValue("cover", value)}
                    className="w-full h-[300px]"
                    {...field}
                    {...form.register("cover")}
                  />
                </FormControl>
                <FormDescription>This is your cover image.</FormDescription>
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
