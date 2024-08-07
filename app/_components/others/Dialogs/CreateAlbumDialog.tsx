import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { FC, ReactNode } from "react";
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
import { useArtistAlbum } from "@/app/_hooks/useArtistAlbum";
import { Album } from "@/app/_types/album";

export type albumDialogType = "upload" | "update";

const THUMBNAIL_MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB;

interface CreateAlbumDialogProps {
  triggerElement?: ReactNode;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  type: albumDialogType;
  album?: Album;
}

export const CreateAlbumDialog: FC<CreateAlbumDialogProps> = ({
  triggerElement,
  open,
  handleOpenChange,
  type,
  album,
}) => {
  const formSchema = z.object({
    title:
      type === "upload"
        ? z.string().min(2, "Album title must be at least 2 characters").max(50)
        : z
            .string()
            .min(2, "Album title must be at least 2 characters")
            .max(50)
            .optional(),
    thumbnail: z
      .instanceof(File)
      .optional()
      .refine((file) => {
        return !file || file.size <= THUMBNAIL_MAX_UPLOAD_SIZE;
      }, "File size must be less than 3MB"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: type === "update" ? album?.album_name : "",
      thumbnail: undefined,
    },
  });

  const { createAlbum } = useArtistAlbum();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createAlbum(values, type, album?.id ?? "");
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
        className="sm:max-w-[350px] max-h-full border-0 overflow-y-auto"
      >
        <h1 className="text-2xl font-semibold">
          {type === "upload" ? "Create album" : "Update album"}
        </h1>
        <Separator className="bg-black/10" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Please enter album name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is album name</FormDescription>
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
                      <FormLabel>Upload thumbnail</FormLabel>
                      <FormControl>
                        <InputSingleFile
                          accept="image/*"
                          setValue={(value) =>
                            form.setValue("thumbnail", value)
                          }
                          className="w-[300px] h-[300px]"
                          defaultValue={
                            type === "update" ? album?.thumbnail_path : ""
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This is the thumbnail of album
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button className="float-end" variant="default" type="submit">
              {type === "update" ? "Update" : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
