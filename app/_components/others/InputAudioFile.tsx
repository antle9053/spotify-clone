import { Input } from "@/app/_components/ui/input";
import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { cn } from "@/app/_lib/utils";
import WaveSurfer from "wavesurfer.js";
import { formatDuration } from "@/app/_helpers/formatDuration";
import { useWavesurfer } from "@wavesurfer/react";
import { Button } from "@/app/_components/ui/button";
import { Pause, Play, X } from "lucide-react";
import { createAudioLink } from "@/app/_helpers/createLinks";

interface InputAudioFileProps {
  className?: string;
  setValue: (value: any) => void;
  defaultValue?: string;
  defaultName?: string;
  defaultDuration?: number;
  setOuterDuration?: (value: number) => void;
}

export const InputAudioFile: FC<InputAudioFileProps> = ({
  className,
  setValue,
  defaultValue,
  setOuterDuration,
  defaultDuration,
  defaultName,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [duration, setDuration] = useState<number | null>(
    defaultDuration ?? null
  );
  const [name, setName] = useState<string>(defaultName ?? "");

  const handleAreaClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: previewRef,
    height: 30,
    waveColor: "#D0D0D0",
    progressColor: "#383838",
    url: preview || createAudioLink(defaultValue!),
    barWidth: 4,
    barRadius: 2,
    barGap: 2,
    cursorWidth: 0,
  });

  console.log(createAudioLink(defaultValue!));

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const handleRemovePreview = () => {
    setPreview("");
    setValue(undefined);
    setName(defaultName || "");
    setDuration(defaultDuration || null);
  };

  return (
    <div
      className={cn(
        "border border-solid border-black/20 rounded-md p-4",
        className
      )}
    >
      <Input
        ref={inputRef}
        accept="audio/*"
        multiple={false}
        type="file"
        className="hidden"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
            const audio = new Audio(URL.createObjectURL(file));
            audio.addEventListener("loadedmetadata", () => {
              setDuration(Math.ceil(audio.duration));
              setOuterDuration?.(Math.ceil(audio.duration));
              setValue(file);
              setName(file.name);
              setPreview(audio.src);
            });
          }
        }}
      ></Input>
      {preview || defaultValue ? (
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center bg-white border-black/30 border gap-2 rounded-md p-2 relative">
            {preview ? (
              <Button
                className="absolute -top-[10px] -right-[10px] w-[20px] h-[20px] rounded-full"
                size="icon"
                type="button"
                onClick={handleRemovePreview}
              >
                <X size={12} />
              </Button>
            ) : null}
            <Button
              onClick={onPlayPause}
              variant="secondary"
              size="icon"
              type="button"
            >
              {isPlaying ? (
                <Pause color="black" size={16} fill="black" />
              ) : (
                <Play color="black" size={16} fill="black" />
              )}
            </Button>
            <div className="flex-grow" ref={previewRef}></div>
          </div>
          {!preview && defaultValue ? (
            <Button
              className="mt-2"
              variant="secondary"
              type="button"
              onClick={handleAreaClick}
            >
              Upload new song
            </Button>
          ) : null}
        </div>
      ) : (
        <div
          className="h-[60px] w-full flex items-center justify-center border border-dashed border-black/30 cursor-pointer"
          onClick={handleAreaClick}
        >
          <p className="text-muted-foreground text-sm">Upload</p>
        </div>
      )}
      {name ? (
        <p className="mt-2 text-sm">
          <span className="font-bold">Name:</span> {name}
        </p>
      ) : null}
      {duration ? (
        <p className="mt-2 text-sm">
          <span className="font-bold">Duration:</span>{" "}
          {formatDuration(duration)}
        </p>
      ) : null}
    </div>
  );
};
