import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      priority // or priority={true}
      width={130}
      height={50}
      alt="logo"
      className="w-auto"
      src="/logo-light-transp.svg"
    />
  );
};
