"use client";

import { SidebarItem } from "@/app/(dashboard)/_components/sidebar-item";

import { Home, FileSearch2 } from "lucide-react";

const guestRoutes = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: FileSearch2,
    label: "Browse",
    href: "/search",
  },
];

export const SidebarRoutes = () => {
  // 👇 This is going to be dynamic
  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
