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
        "ml-4 flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "active rounded-tl-lg rounded-bl-lg text-[#190359] bg-[#94157b] bg-opacity-40 hover:bg-[#94157b] hover:bg-opacity-40 hover:text-[#190359]"
      )}
    >
      <b></b>
      <b></b>
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-[#190359] scale-125"
          )}
        />
        {label}
      </div>
    </button>
  );
};
