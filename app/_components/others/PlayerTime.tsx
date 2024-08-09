"use client";

import { FC, MouseEvent, useState } from "react";
import { formatDuration } from "@/app/_helpers/formatDuration";

interface PlayerTimeProps {
  duration: number;
}

const EXAMPLE_URL = "https://samplelib.com/lib/preview/mp3/sample-12s.mp3";

export const PlayerTime: FC<PlayerTimeProps> = ({ duration }) => {
  const [width, setWidth] = useState(0);

  const handleClick = (e: MouseEvent) => {
    const parent = e.currentTarget;
    const parentRect = parent.getBoundingClientRect();
    const clickPosition = e.clientX - parentRect.left;
    const newWidth = (clickPosition / parentRect.width) * 100;

    setWidth(newWidth);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <span className="text-white/70 text-sm">
        {formatDuration(Math.floor(duration * width) / 100)}
      </span>
      <audio controls className="hidden">
        <source src={EXAMPLE_URL} />
      </audio>
      <div
        className="group max-w-full w-[500px] h-1 rounded-full bg-white/30"
        onClick={handleClick}
      >
        <div
          className="h-full bg-white/50 group-hover:bg-white rounded-full relative"
          style={{ width: `${width}%` }}
        >
          <div className="group-hover:block hidden w-3 h-3 rounded-full bg-white absolute -top-1 -right-1.5"></div>
        </div>
      </div>
      <span className="text-white/70 text-sm">{formatDuration(duration)}</span>
    </div>
  );
};
