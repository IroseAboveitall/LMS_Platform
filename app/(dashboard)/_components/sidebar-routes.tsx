"use client";

import { SidebarItem } from "@/app/(dashboard)/_components/sidebar-item";

import { Home, FileSearch2, ClipboardList, BarChart4 } from "lucide-react";
import { usePathname } from "next/navigation";

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

const instructorRoutes = [
  {
    icon: ClipboardList,
    label: "Courses",
    href: "/instructor/courses",
  },
  {
    icon: BarChart4,
    label: "Analytics",
    href: "/instructor/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isInstructorePage = pathname?.includes("/instructor");

  // 👇 This is going to be dynamic
  const routes = isInstructorePage ? instructorRoutes : guestRoutes;

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
