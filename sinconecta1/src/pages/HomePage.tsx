import { ChevronRight, Zap, Sun, Shield, Building2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/LogoMark";
import BackToEntry from "@/components/BackToEntry";
import GlowBackground from "@/components/GlowBackground";
import { motion } from "framer-motion";

const services = [
  { icon: Zap, label: "Manutenção Elétrica", desc: "Tomadas, fiação, disjuntores e reparos", color: "bg-primary/10 text-primary", shadow: "shadow-md shadow-primary/15" },
  { icon: Sun, label: "Fotovoltaica", desc: "Energia solar, painéis e inversores", color: "bg-secondary/20 text-secondary-foreground", shadow: "shadow-md shadow-secondary/15" },
  { icon: Shield, label: "Padrão de Entrada", desc: "Aumento de carga e conexão principal", color: "bg-accent text-accent-foreground", shadow: "shadow-md shadow-accent-foreground/10" },
  { icon: Building2, label: "Subestação", desc: "Manutenção e adequação de subestações", color: "bg-destructive/10 text-destructive", shadow: "shadow-md shadow-destructive/15" },
];

const priceTable = [
  { name: "Elétrica Básica", price: "R$ 150,00" },
  { name: "Quadros Elétricos", price: "R$ 250,00" },
  { name: "Padrão de Entrada", price: "R$ 500,00" },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      <GlowBackground />
      
      <div className="relative z-10 max-w-md mx-auto px-5 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <LogoMark size="xl" />
            <BackToEntry />
          </div>
          <p className="text-xs font-bold tracking-widest text-primary uppercase bg-accent px-3 py-1.5 rounded-full">
            CFT verificado
          </p>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-on-surface leading-tight mb-3">
            Energia segura para o seu{" "}
            <span className="text-primary">patrimônio</span>
          </h1>
          <p className="text-on-surface/70 text-base mb-6 leading-relaxed font-semibold">
            Conectamos você aos melhores técnicos registrados, garantindo autoridade técnica e transparência total.
          </p>

          {/* Jornada do Usuário */}
          <div className="card-elevated p-5 mb-6 border-2 border-primary/10">
            <h3 className="text-base font-extrabold text-on-surface mb-3">Como funciona</h3>
            <ol className="space-y-2.5">
              {[
                "Encontre por CEP",
                "Escolha o especialista",
                "Negocie direto no WhatsApp",
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full primary-gradient text-primary-foreground text-sm font-extrabold flex items-center justify-center shadow-md shadow-primary/30 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-base font-bold text-on-surface">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Services */}
          <div className="space-y-3 mb-6">
            {services.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="card-elevated p-4 flex items-center gap-4"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.color} ${service.shadow}`}>
                  <service.icon size={26} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-on-surface">{service.label}</h3>
                  <p className="text-sm text-on-surface/60">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-on-surface/60 text-base mb-4 font-semibold">
            Solicite orçamentos agora mesmo com os melhores profissionais da sua região.
          </p>

          {/* Price table */}
          <div className="card-elevated p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">☑️</span>
              <h3 className="text-base font-extrabold text-on-surface">Tabela de Referência</h3>
            </div>
            {priceTable.map((item) => (
              <div key={item.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm font-semibold text-on-surface/70">{item.name}</span>
                <span className="text-base font-extrabold text-primary">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Security Commitment Box */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card-elevated p-5 mb-6 border-l-4 border-secondary"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0 shadow-md shadow-secondary/15">
                <ShieldCheck size={24} className="text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-on-surface mb-1">Compromisso com a Segurança</h3>
                <p className="text-sm text-on-surface/70 leading-relaxed font-semibold">
                  Técnicos com Registro Ativo no Conselho e uso obrigatório de EPIs completos para sua total tranquilidade.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Solicitar */}
        <Button variant="hero" size="lg" className="w-full mb-4 text-base h-14" onClick={() => navigate("/nova-solicitacao")}>
          Buscar Técnico
          <ChevronRight size={20} />
        </Button>

        <p className="text-sm text-center text-on-surface/50 mb-4 font-bold">
          ⚡ O valor da visita técnica é abatido no fechamento do serviço.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
