import { Logo } from "@/app/(dashboard)/_components/logo";
import { SidebarRoutes } from "@/app/(dashboard)/_components/sidebar-routes";

const Sidebar = () => {
  return (
    // 👇 Dark background
    // <div className="h-full bg-[#94157b] bg-opacity-40 text-white">
    <div className="h-full bg-[#0c0f2e]  text-white">
      {/* <div className="h-full border-r shadow-[0px_0px_17px_5px_#00000024]"> */}
      {/* 👇 Logo Container 👇*/}
      <div className="p-6">
        <Logo />
      </div>

      {/* 👇 Sidebar Routes Container👇*/}
      <div className="flex flex-col w-full justify-center h-[50%]">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
