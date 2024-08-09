import { PlayerTime } from "@/app/_components/others/PlayerTime";
import { PlayerControlButtons } from "@/app/_components/others/PlayerControlButtons";

export const PlayerControl = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-1">
      <PlayerControlButtons />
      <PlayerTime duration={290} />
    </div>
  );
};
