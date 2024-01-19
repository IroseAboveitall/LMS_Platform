import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      width={130}
      height={50}
      alt="logo"
      src="/logo-dark-transparent-new.svg"
    />
  );
};
