import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="p-6">
      <Link href="/instructor/create">
        <Button className="bg-[#182B48] hover:bg-[#234661]">
          Create Course
        </Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
