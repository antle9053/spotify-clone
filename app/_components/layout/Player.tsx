import { PlayerControl } from "@/app/_components/others/PlayerControl";

export const Player = () => {
  return (
    <div className="fixed bottom-0 h-[80px] bg-black w-full p-2 flex justify-between items-center">
      <div></div>
      <PlayerControl />
      <div></div>
    </div>
  );
};
