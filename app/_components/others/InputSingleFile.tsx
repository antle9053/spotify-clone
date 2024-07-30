import { Input } from "@/app/_components/ui/input";
import { ChangeEvent, FC, useRef, useState } from "react";
import { cn } from "@/app/_lib/utils";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Eye, Images, Trash } from "lucide-react";
import { createImageLink } from "@/app/_helpers/createLinks";

interface InputSingleFileProps {
  className?: string;
  accept: string;
  setValue: (value: any) => void;
  defaultValue?: string;
}

export const InputSingleFile: FC<InputSingleFileProps> = ({
  accept,
  className,
  setValue,
  defaultValue,
}) => {
  const [preview, setPreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAreaClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      className={cn(
        "border border-solid border-white/20 rounded-md p-4",
        className,
      )}
    >
      <Input
        ref={inputRef}
        accept={accept}
        className="hidden"
        multiple={false}
        type="file"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
            setValue(file);
            let preview = "";
            if (accept.includes("image")) {
              preview = URL.createObjectURL(file as Blob | MediaSource);
            } else {
              preview = "/images/music-placeholder.png";
            }
            setPreview(preview);
          }
        }}
      ></Input>
      {preview || defaultValue ? (
        <div className="group w-full h-full relative">
          <div className="w-full h-full bg-black/40 absolute top-0 left-0 hidden group-hover:flex justify-center items-center gap-2">
            {preview ? (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full"
                  onClick={(e) => {
                    setValue(undefined);
                    setPreview("");
                  }}
                  type="button"
                >
                  <Trash />
                </Button>
              </>
            ) : (
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full"
                onClick={handleAreaClick}
                type="button"
              >
                <Images />
              </Button>
            )}
          </div>
          <Image
            src={
              preview
                ? preview
                : defaultValue
                  ? createImageLink(defaultValue)
                  : ""
            }
            alt="Cover image preview"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className="h-full w-full flex items-center justify-center border border-dashed border-white/30 cursor-pointer"
          onClick={handleAreaClick}
        >
          <p className="text-muted-foreground text-sm">Upload</p>
        </div>
      )}
    </div>
  );
};
