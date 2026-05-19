import { useState } from "react";
import { MapPin, Search, Sun, Wrench, Plug, Building2, MessageCircle, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/LogoMark";
import BackToEntry from "@/components/BackToEntry";
import GlowBackground from "@/components/GlowBackground";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ESPECIALIDADES = [
  { label: "FOTOVOLTAICA", icon: Sun, color: "bg-secondary/20 text-secondary-foreground", shadow: "shadow-md shadow-secondary/20" },
  { label: "MANUTENÇÃO ELÉTRICA", icon: Wrench, color: "bg-primary/10 text-primary", shadow: "shadow-md shadow-primary/20" },
  { label: "RAMAL DE ENTRADA", icon: Plug, color: "bg-accent text-accent-foreground", shadow: "shadow-md shadow-accent-foreground/15" },
  { label: "PC", icon: Building2, color: "bg-destructive/10 text-destructive", shadow: "shadow-md shadow-destructive/20" },
];

type Tecnico = {
  id: string;
  nome_completo: string;
  whatsapp: string | null;
  cep: string | null;
  especialidades: string[] | null;
};

const onlyDigits = (s: string) => s.replace(/\D/g, "");

const NewRequestPage = () => {
  const [cep, setCep] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Tecnico[] | null>(null);

  const canSearch = cep.trim() && whatsapp.trim() && nome.trim() && especialidade;

  const handleSearch = async () => {
    if (!canSearch) {
      toast.error("Preencha todos os campos para buscar.");
      return;
    }
    setLoading(true);
    try {
      const cepDigits = onlyDigits(cep);
      const cepPrefix = cepDigits.slice(0, 5);

      // Save client data
      await supabase.from("clientes").insert({
        nome: nome.trim(),
        cep: cep.trim(),
        whatsapp: onlyDigits(whatsapp),
      });

      let query = supabase
        .from("profissionais")
        .select("id, nome_completo, whatsapp, cep, especialidades")
        .eq("status_validacao", "verificado");

      if (especialidade) {
        query = query.contains("especialidades", [especialidade]);
      }

      const { data, error } = await query;
      if (error) throw error;

      const filtered = (data || []).filter((t) => {
        if (!t.cep) return false;
        return onlyDigits(t.cep).startsWith(cepPrefix);
      });

      // Shuffle results to ensure equity (random order each search)
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);

      setResults(shuffled);
      if (shuffled.length === 0) {
        toast.info("Nenhum técnico verificado encontrado para este CEP. Tente expandir a região.");
      }
    } catch {
      toast.error("Erro ao buscar técnicos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = (whatsapp: string) => {
    const num = onlyDigits(whatsapp);
    const msg = encodeURIComponent("Olá, vi seu perfil no SIN Conecta e preciso de suporte.");
    window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
  };

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      <GlowBackground />
      <div className="relative z-10 max-w-md mx-auto px-5 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <BackToEntry />
          <LogoMark size="sm" />
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-extrabold text-on-surface mb-2">
            Encontre um <span className="text-primary">técnico</span> próximo
          </h1>
          <p className="text-base text-on-surface/70 mb-6 font-semibold">
            Informe seu CEP e (obrigatório) a especialidade desejada.
          </p>
        </motion.div>

        {/* CEP */}
        <div className="card-elevated p-5 mb-5 space-y-4 border-2 border-border">
          <div>
            <label className="text-sm font-bold text-on-surface mb-2 block">Seu nome *</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Roberto Silva"
              className={`w-full h-12 px-4 rounded-2xl border-2 bg-card text-on-surface text-base font-semibold outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                !nome.trim() ? "border-destructive/50" : "border-border"
              }`}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-on-surface mb-2 block">WhatsApp *</label>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="(11) 99999-9999"
              className={`w-full h-12 px-4 rounded-2xl border-2 bg-card text-on-surface text-base font-semibold outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                !whatsapp.trim() ? "border-destructive/50" : "border-border"
              }`}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-on-surface mb-2 block">CEP *</label>
            <div className="relative">
              <input
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="00000-000"
                className={`w-full h-12 px-4 pr-11 rounded-2xl border-2 bg-card text-on-surface text-base font-semibold outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                  !cep.trim() ? "border-destructive/50" : "border-border"
                }`}
              />
              <MapPin size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-on-surface mb-2 block">Especialidade (obrigatório) *</label>
            <div className="grid grid-cols-2 gap-3">
              {ESPECIALIDADES.map((esp) => {
                const active = especialidade === esp.label;
                return (
                  <button
                    key={esp.label}
                    onClick={() => setEspecialidade(active ? "" : esp.label)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      active ? "border-primary shadow-lg shadow-primary/20 bg-accent" : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${esp.color} ${esp.shadow}`}>
                      <esp.icon size={20} />
                    </div>
                    <span className="text-xs font-extrabold text-on-surface leading-tight block">{esp.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Button variant="hero" size="lg" className="w-full text-base h-13" disabled={loading || !canSearch} onClick={handleSearch}>
            <Search size={18} />
            {loading ? "Buscando..." : "Buscar Técnico"}
          </Button>
        </div>

        {/* Results */}
        {results !== null && (
          <div className="space-y-3 mb-6">
            <h2 className="text-lg font-extrabold text-on-surface">
              {results.length} técnico{results.length === 1 ? "" : "s"} encontrado{results.length === 1 ? "" : "s"}
            </h2>
            {results.map((tec) => (
              <motion.div
                key={tec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-elevated p-5 border-2 border-border"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl primary-gradient flex items-center justify-center text-primary-foreground font-extrabold text-lg shadow-lg shadow-primary/20 flex-shrink-0">
                    {tec.nome_completo.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-extrabold text-on-surface flex items-center gap-1.5">
                      {tec.nome_completo}
                      <BadgeCheck size={18} className="text-primary drop-shadow" />
                    </h3>
                    <p className="text-sm text-on-surface/70 font-bold">CEP: {tec.cep}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(tec.especialidades || []).map((e) => (
                        <span key={e} className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-accent text-accent-foreground border border-primary/20">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1eb955] text-white h-12"
                  disabled={!tec.whatsapp}
                  onClick={() => tec.whatsapp && openWhatsApp(tec.whatsapp)}
                >
                  <MessageCircle size={18} />
                  Falar no WhatsApp
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Legal Disclaimer */}
        <div className="card-elevated p-5 border-2 border-border">
          <p className="text-sm text-on-surface leading-relaxed font-bold">
            A SINCONECTA atua exclusivamente como uma vitrine de conexão técnica.
            A plataforma não interfere, não recomenda e não possui qualquer responsabilidade
            pela escolha de um profissional específico em detrimento de outros apresentados na lista.
            <br /><br />
            A decisão de contratação é de livre e exclusiva escolha do usuário.
            Todas as tratativas, orçamentos, garantias e pagamentos são realizados diretamente entre as partes.
            <br /><br />
            A SINCONECTA não possui acesso a transações financeiras e não se responsabiliza
            pela execução ou qualidade dos serviços prestados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewRequestPage;
