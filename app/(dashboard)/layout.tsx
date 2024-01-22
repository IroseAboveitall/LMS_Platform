import Sidebar from "@/app/(dashboard)/_components/sidebar";
import { Navbar } from "@/app/(dashboard)/_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>

      <div className="hidden md:flex flex-col h-full w-56  fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      {/* Push the content other than the sidebar to the right by the same amount of padding as is the width of the Sidebar */}
      <main className="md:pl-56 pt-[80px]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
