"use client";
// 👆 For using hooks like usePathname()

import "./sidebar.css";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  // 👆 usePathname() returns a string of the current URL’s pathname. For example, if the current URL is https://example.com/about, usePathname() will return /about

  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "ml-4 rounded-tl-lg rounded-bl-lg flex items-center gap-x-2 text-[#d3efff] text-sm font-[500] pl-6 transition-all hover:text-[#67eaf7] hover:bg-slate-100/10",
        isActive &&
          "active  text-[#0c0f2e] bg-white hover:bg-white hover:text-[#0c0f2e]"
      )}
    >
      <b></b>
      <b></b>
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("", isActive && "text-[#0c0f2e] scale-125")}
        />
        {label}
      </div>
    </button>
  );
};
