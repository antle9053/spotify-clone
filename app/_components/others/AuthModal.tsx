"use client";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { FC, ReactNode, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUser } from "@/app/_hooks/useUser";
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { handleOpenChange } from "@/app/_redux/slices/authSlice";

interface AuthDialogProps {
  triggerElement?: ReactNode;
}

export const AuthDialog: FC<AuthDialogProps> = ({ triggerElement }) => {
  const open = useAppSelector((state: RootState) => state.auth.isOpen);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { supabaseClient } = useUser();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      router.refresh();
      dispatch(handleOpenChange(false));
    }
  }, [session]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        dispatch(handleOpenChange(open));
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => {
          dispatch(handleOpenChange(true));
        }}
      >
        {triggerElement}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-0">
        <Auth
          theme="dark"
          magicLink
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#404040",
                  defaultButtonBackground: "inherit",
                },
              },
            },
          }}
          providers={["google"]}
        />
      </DialogContent>
    </Dialog>
  );
};
