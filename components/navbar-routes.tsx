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
        <Button
          size="sm"
          className="mr-5 bg-[#11555b] hover:text-[#67eaf7] hover:bg-[#11555b]"
        >
          <Link href="/" className="flex">
            <LogOut className="h-4 w-4 mr-2" />
            Leave
          </Link>
        </Button>
      ) : (
        // <Button className="mr-5 bg-[#11555b] hover:bg-[#11555be7]">

        <Button
          size="sm"
          className="mr-5 bg-[#11555b] hover:text-[#67eaf7] hover:bg-[#11555b]"
        >
          <Link href="/instructor/courses">Instructor Dashboard</Link>
        </Button>
      )}
      {/* TODO : Implement Authentication Button*/}
      <Button size="sm" variant="userButton" className="rounded-full">
        User
      </Button>
    </div>
  );
};
