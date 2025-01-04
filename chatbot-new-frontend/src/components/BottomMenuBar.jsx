import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconUser,
  IconRobot
} from "@tabler/icons-react";
import Profile from "./screens/Profile";
import AddBot from "./screens/AddBot";


export function FloatingDockDemo() {
  const links = [
    // {
    //   title: "Chat",
    //   icon: (
    //     <IconBrandLine className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    //   ),
    //   href: "#",
    //   action : "chat",
    //   component : <Chat/>
    // },

    {
      title: "Add Bot",
      icon: (
        <IconRobot className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      action : "add",
      component : <AddBot/>
    },
    {
      title: "Profile",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      action : "profile",
      component : <Profile/>
    }
  ];
  return (
    (<div className="flex items-center justify-center">
      <FloatingDock
        // only for demo, remove for production
        // mobileClassName="translate-y-20"
        items={links} />
    </div>)
  );
}
