import { AlignLeft } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Sidebar from "@/app/(dashboard)/_components/sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition text-[#0c0f2e]">
        <AlignLeft />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 border-none shadow-none">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
