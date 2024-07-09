"use client";

import { cn } from "@/app/_lib/utils";
import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Home, Search, User } from "lucide-react";
import { AuthDialog } from "../others/AuthModal";
import { useUser } from "@/app/_hooks/useUser";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header: FC<HeaderProps> = ({ children, className }) => {
  const { user, handleLogout } = useUser();
  return (
    <div className={cn("h-fit bg-gradient-to-b from-slate-600 p-6", className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <Button size="icon" className="rounded-full">
            <ChevronLeft color="white" />
          </Button>
          <Button size="icon" className="rounded-full">
            <ChevronRight color="white" />
          </Button>
        </div>
        <div className="md:hidden flex gap-x-2 items-center">
          <Button size="icon" variant="secondary" className="rounded-full">
            <Home color="black" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full">
            <Search color="black" />
          </Button>
        </div>

        {user ? (
          <div className="flex justify-between gap-x-4 items-center">
            <Button variant="secondary" onClick={handleLogout}>
              Log out
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full">
              <User color="black" />
            </Button>
          </div>
        ) : (
          <>
            <AuthDialog
              triggerElement={
                <div className="flex justify-between gap-x-4 items-center">
                  <Button variant="ghost" className="text-white">
                    Sign up
                  </Button>
                  <Button variant="secondary">Log in</Button>
                </div>
              }
            />
          </>
        )}
      </div>
      {children}
    </div>
  );
};
