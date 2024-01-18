import { Logo } from "@/app/(dashboard)/_components/logo";

const Sidebar = () => {
  return (
    // 👇 Dark background
    // <div className="h-full border-r bg-[#100133] text-white shadow-[0px_20px_20px_10px_#00000024]">
    <div className="h-full border-r shadow-[0px_0px_17px_5px_#00000024]">
      <div className="p-6">
        <Logo />
      </div>
    </div>
  );
};

export default Sidebar;
