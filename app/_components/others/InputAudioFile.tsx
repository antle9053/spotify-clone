import { Input } from "@/app/_components/ui/input";
import { ChangeEvent, FC, useRef, useState } from "react";
import { cn } from "@/app/_lib/utils";
import Image from "next/image";
import { formatDuration } from "@/app/_helpers/formatDuration";

interface InputAudioFileProps {
  className?: string;
  setValue: (value: any) => void;
  defaultValue?: string;
  setOuterDuration?: (value: number) => void;
}

export const InputAudioFile: FC<InputAudioFileProps> = ({
  className,
  setValue,
  defaultValue,
  setOuterDuration,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [duration, setDuration] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "border border-solid border-white/20 rounded-md p-4",
        className,
      )}
    >
      <Input
        ref={inputRef}
        accept="audio/*"
        multiple={false}
        type="file"
        defaultValue={defaultValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
            const audio = new Audio(URL.createObjectURL(file));
            audio.addEventListener("loadedmetadata", () => {
              console.log(audio.duration);
              setDuration(Math.ceil(audio.duration));
              setOuterDuration?.(Math.ceil(audio.duration));
              setValue(file);
            });
          }
        }}
      ></Input>
      {duration ? (
        <p className="mt-2">Duration: {formatDuration(duration)}</p>
      ) : null}
    </div>
  );
};
