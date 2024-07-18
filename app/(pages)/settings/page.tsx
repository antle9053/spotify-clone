import { Separator } from "@/app/_components/ui/separator";
import { ToggleArtist } from "@/app/_components/others/ToggleArtist";

export default function SettingsPage() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-2">
        <h1 className="text-white text-3xl font-semibold mb-2">Settings</h1>
      </div>
      <Separator className="my-4 bg-white/10" />
      <div>
        <ToggleArtist />
      </div>
    </div>
  );
}
