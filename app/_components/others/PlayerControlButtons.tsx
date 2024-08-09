import { ChevronFirst, ChevronLast, Play, Repeat, Shuffle } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export const PlayerControlButtons = () => {
  return (
    <div className="flex items-center justify-center w-full gap-2">
      <div className="p-1 cursor-pointer">
        <Shuffle className="text-white/70 hover:text-white" size={20} />
      </div>
      <div className="p-1 cursor-pointer">
        <ChevronFirst className="text-white/70 hover:text-white" size={20} />
      </div>
      <Button
        size="icon"
        className="group bg-white rounded-full hover:border-white hover:border overflow-hidden"
      >
        <Play className="text-black/70 group-hover:text-white" size={20} />
      </Button>
      <div className="p-1 cursor-pointer">
        <ChevronLast className="text-white/70 hover:text-white" size={20} />
      </div>
      <div className="p-1 cursor-pointer">
        <Repeat className="text-white/70 hover:text-white" size={20} />
      </div>
    </div>
  );
};
