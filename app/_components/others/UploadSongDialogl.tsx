"use client";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { FC, ReactNode } from "react";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

interface UploadSongDialogProps {
  triggerElement?: ReactNode;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
}

export const UploadSongDialog: FC<UploadSongDialogProps> = ({
  triggerElement,
  open,
  handleOpenChange,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        handleOpenChange(open);
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => {
          handleOpenChange(true);
        }}
      >
        {triggerElement}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-0">
        <h1 className="text-white text-2xl font-semibold">Upload song</h1>
        <div className="flex items-center justify-start gap-5">
          <div>
            <p className="text-white">Upload song</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
