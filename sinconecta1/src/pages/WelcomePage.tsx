import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/LogoMark";
import GlowBackground from "@/components/GlowBackground";
import { ChevronRight } from "lucide-react";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <GlowBackground />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full flex flex-col items-center text-center"
      >
        <LogoMark size="xl" />
        <h1 className="text-3xl font-extrabold text-on-surface mt-6 tracking-tight">
          Boas-vindas ao <span className="text-primary">SINCONECTA</span>
        </h1>
        <p className="text-base text-on-surface/75 font-semibold mt-4 leading-relaxed">
          A plataforma que conecta clientes que precisam de soluções diretamente aos
          profissionais técnicos em eletricidade, da região, de forma rápida,
          sem intermediários e sem taxas.
        </p>

        <Button
          variant="hero"
          size="lg"
          className="w-full mt-10 text-base h-14"
          onClick={() => navigate("/perfil")}
        >
          Prosseguir
          <ChevronRight size={20} />
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
