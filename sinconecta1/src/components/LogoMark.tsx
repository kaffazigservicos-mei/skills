import sinconectaLogo from "@/assets/sinconecta-logo.png";

const LogoMark = ({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) => {
  // +40% over previous sizes
  const sizes = {
    sm: "w-14 h-14",
    md: "w-20 h-20",
    lg: "w-28 h-28",
    xl: "w-40 h-40",
  };

  return (
    <img
      src={sinconectaLogo}
      alt="SINCONECTA"
      className={`${sizes[size]} rounded-2xl object-contain`}
    />
  );
};

export default LogoMark;
