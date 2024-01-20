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
        "ml-4 rounded-tl-[20px] rounded-bl-[20px] flex items-center gap-x-2 text-[#d3efff] text-sm font-[500] pl-6 transition-all duration-0 hover:text-[#67eaf7]",
        isActive &&
          "active  text-[#0c0f2e] bg-white hover:bg-white hover:text-[#0c0f2e]"
      )}
    >
      <b className="z-10 pointer-events-none"></b>
      <b className="z-10 pointer-events-none"></b>
      <div className="z-40 pointer-events-none flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn(isActive && "scale-125")} />
        {label}
      </div>
    </button>
  );
};
