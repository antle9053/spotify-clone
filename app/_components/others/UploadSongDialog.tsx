import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { FC, ReactNode, useState } from "react";
import { z } from "zod";
import { Separator } from "@/app/_components/ui/separator";
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
import { InputSingleFile } from "@/app/_components/others/InputSingleFile";
import { Button } from "@/app/_components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useArtistSong } from "@/app/_hooks/useArtistSong";
import { InputAudioFile } from "@/app/_components/others/InputAudioFile";
import { Song } from "@/app/_types/song";

export type songDialogType = "upload" | "update";

const THUMBNAIL_MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB;
const SONG_MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB;

interface UploadSongDialogProps {
  triggerElement?: ReactNode;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  type: songDialogType;
  song?: Song;
}

export const UploadSongDialog: FC<UploadSongDialogProps> = ({
  triggerElement,
  open,
  handleOpenChange,
  type,
  song,
}) => {
  const formSchema = z.object({
    title:
      type === "upload"
        ? z.string().min(2, "Song title must be at least 2 characters").max(50)
        : z
            .string()
            .min(2, "Song title must be at least 2 characters")
            .max(50)
            .optional(),
    duration: z.number(),
    thumbnail: z
      .instanceof(File)
      .optional()
      .refine((file) => {
        return !file || file.size <= THUMBNAIL_MAX_UPLOAD_SIZE;
      }, "File size must be less than 3MB"),
    song:
      type === "upload"
        ? z.instanceof(File).refine((file) => {
            return !file || file.size <= SONG_MAX_UPLOAD_SIZE;
          }, "File size must be less than 3MB")
        : z
            .instanceof(File)
            .optional()
            .refine((file) => {
              return !file || file.size <= SONG_MAX_UPLOAD_SIZE;
            }, "File size must be less than 3MB"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: type === "update" ? song?.title : "",
      duration: 0,
      thumbnail: undefined,
      song: undefined,
    },
  });

  const { uploadSong } = useArtistSong();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await uploadSong(values, type, song?.id ?? "");
    handleOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        handleOpenChange(open);
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => {
          handleOpenChange(true);
        }}
      >
        {triggerElement}
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[700px] max-h-full bg-neutral-900 border-0 overflow-y-auto"
      >
        <h1 className="text-white text-2xl font-semibold">Upload song</h1>
        <Separator className="my-3 bg-white/10" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Song title</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-white border-white/20"
                      placeholder="Please enter song title"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is song&apos;s title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <div className="flex-grow basis-[300px]">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Upload thumbnail
                      </FormLabel>
                      <FormControl>
                        <InputSingleFile
                          accept="image/*"
                          setValue={(value) =>
                            form.setValue("thumbnail", value)
                          }
                          className="w-[300px] h-[300px]"
                          defaultValue={
                            type === "update" ? song?.thumbnail_path : ""
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This is the thumbnail of song
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-grow basis-[300px]">
                <FormField
                  control={form.control}
                  name="song"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Upload song</FormLabel>
                      <FormControl>
                        <InputAudioFile
                          setValue={(value) => form.setValue("song", value)}
                          setOuterDuration={(value) =>
                            form.setValue("duration", value)
                          }
                          className="text-white w-full"
                        />
                      </FormControl>
                      <FormDescription>This is the song</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button className="float-end" variant="secondary" type="submit">
              Upload
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
