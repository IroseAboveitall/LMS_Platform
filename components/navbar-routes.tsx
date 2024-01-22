"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isInstructorPage = pathname?.startsWith("/instructor");
  const isLearnerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isInstructorPage || isLearnerPage ? (
        <Link href="/" className="mr-4">
          <Button
            size="sm"
            className=" bg-[#11555b] hover:text-[#67eaf7] hover:bg-[#11555b]"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Leave
          </Button>
        </Link>
      ) : (
        // <Button className="mr-5 bg-[#11555b] hover:bg-[#11555be7]">

        <Link href="/instructor/courses" className="mr-4">
          <Button
            size="sm"
            className=" bg-[#11555b] hover:text-[#67eaf7] hover:bg-[#11555b]"
          >
            Instructor Dashboard
          </Button>
        </Link>
      )}
      {/* TODO : Implement Authentication Button*/}
      <Button size="sm" variant="userButton" className="rounded-full">
        User
      </Button>
    </div>
  );
};
