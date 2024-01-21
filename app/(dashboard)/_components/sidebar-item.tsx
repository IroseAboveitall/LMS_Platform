"use client";
// 👆 For using hooks like usePathname()

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
        "relative ml-2 rounded-tl-[20px] rounded-bl-[20px] flex items-center gap-x-2 text-[#d3efff] text-sm font-[500] pl-6 transition-all duration-0 hover:text-[#67eaf7]",
        isActive &&
          "text-[#0c0f2e] bg-white hover:bg-white hover:text-[#0c0f2e]"
      )}
    >
      <b
        className={cn(
          "z-10 pointer-events-none absolute top-[-20px] h-[20px] w-full right-0 bg-white hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0c0f2e] before:rounded-br-[20px]",
          isActive && "md:block"
        )}
      ></b>
      <b
        className={cn(
          "z-10 pointer-events-none absolute bottom-[-20px] right-0 h-[20px] w-full bg-white hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0c0f2e] before:rounded-tr-[20px]",
          isActive && "md:block"
        )}
      ></b>
      <div className="z-40 pointer-events-none flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn(isActive && "scale-125")} />
        {label}
      </div>
    </button>
  );
};
