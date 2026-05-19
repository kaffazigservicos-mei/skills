import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/LogoMark";
import GlowBackground from "@/components/GlowBackground";

const SplashPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <GlowBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <div className="scale-150 mb-8 drop-shadow-[0_8px_24px_rgba(0,61,155,0.25)]">
          <LogoMark size="lg" />
        </div>
        <h1 className="text-5xl font-extrabold text-on-surface tracking-tight mb-3">
          SIN<span className="text-primary">CONECTA</span>
        </h1>
        <p className="text-lg text-on-surface/70 font-semibold max-w-sm mb-10">
          A ponte segura entre você e técnicos eletricistas verificados.
        </p>
        <Button variant="hero" size="lg" className="text-lg h-14 px-10" onClick={() => navigate("/perfil")}>
          Entrar
        </Button>
      </motion.div>
    </div>
  );
};

export default SplashPage;
