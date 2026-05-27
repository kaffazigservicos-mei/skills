import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/LogoMark";
import GlowBackground from "@/components/GlowBackground";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { User, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EntryPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"choose" | "professional">("choose");
  const [cftOrCpf, setCftOrCpf] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProfessionalSubmit = async () => {
    if (!cftOrCpf.trim()) return;
    setLoading(true);
    try {
      const { data } = await supabase.rpc("check_professional_exists", {
        _cpf_cft: cftOrCpf.trim(),
      });
      if (data && data.length > 0 && data[0].exists_flag) {
        const status = data[0].status;
        if (status === "pendente") {
          toast.info("Seu cadastro já existe e está em análise. Aguarde a validação.");
        } else {
          toast.info("Registro já existente. Você já está cadastrado.");
        }
      } else {
        navigate("/cadastro-tecnico");
      }
    } catch {
      toast.error("Erro ao verificar registro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <GlowBackground />
      <div className="relative z-10 max-w-md w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center mb-10"
        >
          <LogoMark size="xl" />
          <h1 className="text-2xl font-extrabold text-on-surface mt-4 tracking-tight">SINCONECTA</h1>
          <p className="text-sm text-on-surface/60 font-semibold mt-1 text-center">
            Escolha seu perfil para continuar
          </p>
        </motion.div>

        {mode === "choose" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <button
              onClick={() => navigate("/nova-solicitacao")}
              className="w-full card-elevated p-6 flex items-center gap-4 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-md shadow-primary/10">
                <User size={28} className="text-primary" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-extrabold text-on-surface">Sou Cliente (Buscar Técnico)</h3>
                <p className="text-xs text-on-surface/60 font-semibold">Preciso de um profissional qualificado</p>
              </div>
            </button>

            <button
              onClick={() => setMode("professional")}
              className="w-full card-elevated p-6 flex items-center gap-4 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center shadow-md shadow-secondary/10">
                <Wrench size={28} className="text-secondary-foreground" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-extrabold text-on-surface">Sou Profissional (Cadastrar-me)</h3>
                <p className="text-xs text-on-surface/60 font-semibold">Quero me cadastrar como técnico</p>
              </div>
            </button>
          </motion.div>
        )}

        {mode === "professional" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated p-6 space-y-4"
          >
            <h2 className="text-lg font-extrabold text-on-surface">Informe seu Registro CFT ou CPF</h2>
            <input
              value={cftOrCpf}
              onChange={(e) => setCftOrCpf(e.target.value)}
              placeholder="Ex: CFT-12345 ou 000.000.000-00"
              className="w-full h-12 px-4 rounded-2xl border-2 border-border bg-background text-on-surface text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleProfessionalSubmit()}
            />
            <p className="text-xs text-on-surface/50 font-semibold">
              Verificamos se seu registro já existe na base para evitar duplicidade.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setMode("choose")} disabled={loading}>
                Voltar
              </Button>
              <Button
                variant="hero"
                className="flex-1"
                disabled={!cftOrCpf.trim() || loading}
                onClick={handleProfessionalSubmit}
              >
                {loading ? "Verificando..." : "Verificar"}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EntryPage;
