import sinconectaLogo from "@/assets/sinconecta-logo.png";

const LogoMark = ({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) => {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
    xl: "w-28 h-28",
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
