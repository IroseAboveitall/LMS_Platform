import { Logo } from "@/app/(dashboard)/_components/logo";
import { SidebarRoutes } from "@/app/(dashboard)/_components/sidebar-routes";

const Sidebar = () => {
  return (
    // 👇 Dark background
    // <div className="h-full border-r bg-[#100133] text-white shadow-[0px_20px_20px_10px_#00000024]">
    <div className="h-full border-r shadow-[0px_0px_17px_5px_#00000024]">
      <div className="p-6">
        <Logo />
      </div>
      {/* 👇 Sidebar Routes */}
      <div className="flex flex-col w-full justify-center h-[50%]">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
