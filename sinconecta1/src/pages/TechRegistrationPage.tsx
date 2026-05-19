import { useState, useRef, useMemo } from "react";
import { MapPin, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/LogoMark";
import BackToEntry from "@/components/BackToEntry";
import GlowBackground from "@/components/GlowBackground";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ESPECIALIDADES_OPTIONS = [
  "FOTOVOLTAICA",
  "MANUTENÇÃO ELÉTRICA",
  "RAMAL DE ENTRADA",
  "PC",
];

const TechRegistrationPage = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cft, setCft] = useState("");
  const [cep, setCep] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [cftPhoto, setCftPhoto] = useState<File | null>(null);
  const [idPhoto, setIdPhoto] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const cftPhotoRef = useRef<HTMLInputElement>(null);
  const idPhotoRef = useRef<HTMLInputElement>(null);

  const isValid = useMemo(() => {
    return name.trim() && cpf.trim() && cft.trim() && cep.trim() && whatsapp.trim() && especialidades.length > 0 && cftPhoto && idPhoto;
  }, [name, cpf, cft, cep, whatsapp, especialidades, cftPhoto, idPhoto]);

  const toggleEspecialidade = (esp: string) => {
    setEspecialidades((prev) => (prev.includes(esp) ? prev.filter((x) => x !== esp) : [...prev, esp]));
  };

  const fieldClass = (value: string | File | null) => {
    if (touched && !value) return "border-error ring-1 ring-error";
    return "border-border focus:ring-2 focus:ring-primary focus:border-primary";
  };

  const handleSubmit = async () => {
    setTouched(true);
    if (!isValid) return;
    setLoading(true);

    try {
      const cpfCft = cft.trim() || cpf.trim();
      const { data: existing } = await supabase
        .from("profissionais")
        .select("id")
        .ilike("cpf_cft", cpfCft)
        .limit(1);

      if (existing && existing.length > 0) {
        toast.error("Este CPF/CFT já está cadastrado. Seu perfil está em análise ou já foi aprovado.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("profissionais").insert({
        nome_completo: name.trim(),
        cpf_cft: cpfCft,
        whatsapp: whatsapp.trim(),
        cep: cep.trim(),
        especialidades: especialidades,
        status_validacao: "pendente",
      });

      if (error) throw error;

      toast.success(
        "Dados enviados com sucesso! Nossa equipe técnica realizará a validação manual do seu registro CFT e documentação. Você receberá uma notificação assim que seu perfil for ativado.",
        { duration: 8000 }
      );
    } catch {
      toast.error("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      <GlowBackground />
      <div className="relative z-10 max-w-md mx-auto px-5 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <BackToEntry />
          <LogoMark size="sm" />
        </div>

        <div className="flex flex-col items-center mb-6">
          <LogoMark size="lg" />
          <h1 className="text-xl font-extrabold text-on-surface mt-4 text-center">SINCONECTA</h1>
          <p className="text-xs text-on-surface/60 text-center mt-1 max-w-[280px] font-semibold">
            Junte-se à maior rede de especialistas. Validamos seu registro para garantir segurança e autoridade da plataforma.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">Nome Completo *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Ricardo Silva de Almeida"
              className={`w-full h-11 px-4 rounded-2xl border-2 border-border bg-card text-on-surface text-sm outline-none transition-all ${fieldClass(name)}`} />
            {touched && !name.trim() && <p className="text-xs text-error mt-1">Campo obrigatório</p>}
          </div>

          {/* CPF */}
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">CPF *</label>
            <input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00"
              className={`w-full h-11 px-4 rounded-2xl border-2 border-border bg-card text-on-surface text-sm outline-none transition-all ${fieldClass(cpf)}`} />
            {touched && !cpf.trim() && <p className="text-xs text-error mt-1">Campo obrigatório</p>}
          </div>

          {/* CFT */}
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">Registro CFT *</label>
            <input value={cft} onChange={(e) => setCft(e.target.value)} placeholder="Número do Registro"
              className={`w-full h-11 px-4 rounded-2xl border-2 border-border bg-card text-on-surface text-sm outline-none transition-all ${fieldClass(cft)}`} />
            {touched && !cft.trim() && <p className="text-xs text-error mt-1">Campo obrigatório</p>}
          </div>

          {/* Especialidades (multi-select) */}
          <div>
            <label className="text-xs font-bold text-on-surface mb-2 block">Especialidades * (selecione uma ou mais)</label>
            <div className="grid grid-cols-2 gap-2">
              {ESPECIALIDADES_OPTIONS.map((esp) => {
                const checked = especialidades.includes(esp);
                return (
                  <label
                    key={esp}
                    className={`flex items-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      checked ? "border-primary bg-accent shadow-md shadow-primary/10" : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleEspecialidade(esp)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-xs font-extrabold text-on-surface leading-tight">{esp}</span>
                  </label>
                );
              })}
            </div>
            {touched && especialidades.length === 0 && <p className="text-xs text-error mt-1">Selecione pelo menos uma especialidade</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">WhatsApp *</label>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(11) 99999-9999"
              className={`w-full h-11 px-4 rounded-2xl border-2 border-border bg-card text-on-surface text-sm outline-none transition-all ${fieldClass(whatsapp)}`} />
            {touched && !whatsapp.trim() && <p className="text-xs text-error mt-1">Campo obrigatório</p>}
          </div>

          {/* CEP */}
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block flex items-center gap-1">
              <MapPin size={14} className="text-primary" /> CEP de Atuação *
            </label>
            <input value={cep} onChange={(e) => setCep(e.target.value)} placeholder="00000-000"
              className={`w-full h-11 px-4 rounded-2xl border-2 border-border bg-card text-on-surface text-sm outline-none transition-all ${fieldClass(cep)}`} />
            <p className="text-[10px] text-on-surface/50 mt-1">O CEP é usado para você receber chamados por proximidade.</p>
            {touched && !cep.trim() && <p className="text-xs text-error mt-1">Campo obrigatório</p>}
          </div>

          {/* CFT Photo */}
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">Foto do Registro CFT *</label>
            <input type="file" ref={cftPhotoRef} accept="image/*,.pdf" className="hidden" onChange={(e) => setCftPhoto(e.target.files?.[0] || null)} />
            <button onClick={() => cftPhotoRef.current?.click()}
              className={`w-full h-28 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
                cftPhoto ? "border-primary bg-accent" : touched ? "border-error bg-error/5" : "border-border bg-card hover:border-primary/50"
              }`}>
              <Upload size={28} className={cftPhoto ? "text-primary" : "text-on-surface/30"} />
              <span className={`text-xs font-bold ${cftPhoto ? "text-primary" : "text-on-surface/40"}`}>{cftPhoto ? cftPhoto.name : "Clique ou arraste"}</span>
              <span className="text-[10px] text-on-surface/40">JPG, PNG ou PDF (Máx. 5MB)</span>
            </button>
            {touched && !cftPhoto && <p className="text-xs text-error mt-1">Foto obrigatória</p>}
          </div>

          {/* ID Photo */}
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">Foto de Identificação Profissional *</label>
            <input type="file" ref={idPhotoRef} accept="image/*,.pdf" className="hidden" onChange={(e) => setIdPhoto(e.target.files?.[0] || null)} />
            <button onClick={() => idPhotoRef.current?.click()}
              className={`w-full h-28 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
                idPhoto ? "border-primary bg-accent" : touched ? "border-error bg-error/5" : "border-border bg-card hover:border-primary/50"
              }`}>
              <Upload size={28} className={idPhoto ? "text-primary" : "text-on-surface/30"} />
              <span className={`text-xs font-bold ${idPhoto ? "text-primary" : "text-on-surface/40"}`}>{idPhoto ? idPhoto.name : "Clique ou arraste"}</span>
              <span className="text-[10px] text-on-surface/40">JPG, PNG ou PDF (Máx. 5MB)</span>
            </button>
            {touched && !idPhoto && <p className="text-xs text-error mt-1">Foto obrigatória</p>}
          </div>

          <Button variant="hero" size="lg" className="w-full mt-4" disabled={(touched && !isValid) || loading} onClick={handleSubmit}>
            {loading ? "Cadastrando..." : "Cadastrar Técnico"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TechRegistrationPage;
