import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LogoMark from "@/components/LogoMark";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/boas-vindas"), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-secondary">
      {/* glass orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-secondary/40 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-primary-foreground/20 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <div className="scale-[2.34] mb-14 drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <LogoMark size="xl" />
        </div>
        <h1 className="text-5xl font-extrabold text-primary-foreground tracking-tight">
          SIN<span className="text-secondary">CONECTA</span>
        </h1>
        <p className="text-base text-primary-foreground/85 font-semibold mt-3">
          Conexão direta. Energia segura.
        </p>
      </motion.div>
    </div>
  );
};

export default SplashPage;
