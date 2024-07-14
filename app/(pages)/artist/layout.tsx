import { Header } from "@/app/_components/layout/Header";
import { Separator } from "@/app/_components/ui/separator";
import { ArtistMenu } from "@/app/_components/others/ArtistMenu";

export default function ArtistPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto scrollbar">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold mb-2">Artist</h1>
          <p className="text-white/70 text-base">
            Upload and manage your profile, songs, albums, playlist, ...
          </p>
        </div>
        <Separator className="my-4 bg-white/10" />
        <div className="flex flex-col md:flex-row items-start">
          <ArtistMenu />
          <div className="py-4 px-0 md:py-0 md:pl-6 flex-1">{children}</div>
        </div>
      </Header>
    </div>
  );
}
