import { Slider } from "@/app/_components/ui/slider";
import { cn } from "@/app/_lib/utils";
import { ComponentProps, FC } from "react";

type SliderProps = ComponentProps<typeof Slider>;

export const PlayerTime: FC<SliderProps> = ({ className, ...props }) => {
  return (
    <div className="flex justify-center items-center">
      <span className="text-white/70">0:00</span>
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[60%]", className)}
        {...props}
      />{" "}
      <span className="text-white/70">4:20</span>
    </div>
  );
};
