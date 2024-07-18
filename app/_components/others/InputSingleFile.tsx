import { Input } from "@/app/_components/ui/input";
import { ChangeEvent, FC, useRef, useState } from "react";
import { cn } from "@/app/_lib/utils";
import Image from "next/image";

interface InputSingleFileProps {
  className?: string;
  accept: string;
  setValue: (value: any) => void;
  defaultValue?: string;
  [key: string]: any;
}

export const InputSingleFile: FC<InputSingleFileProps> = ({
  accept,
  className,
  setValue,
  defaultValue,
  ...rest
}) => {
  const [preview, setPreview] = useState<string>(defaultValue ?? "");
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
            const preview = URL.createObjectURL(file as Blob | MediaSource);
            setPreview(preview);
          }
        }}
        {...rest}
      ></Input>
      {preview ? (
        <Image
          src={preview}
          alt="Cover image preview"
          width={0}
          height={0}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="h-full w-full flex items-center justify-center border border-dashed border-white/30"
          onClick={handleAreaClick}
        >
          <p className="text-muted-foreground text-sm">
            Drag and drop some files here, or click to select files
          </p>
        </div>
      )}
    </div>
  );
};
