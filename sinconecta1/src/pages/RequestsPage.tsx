import { Calendar, MapPin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/LogoMark";
import BackToEntry from "@/components/BackToEntry";
import GlowBackground from "@/components/GlowBackground";
import { motion } from "framer-motion";

const requests = [
  {
    id: 1,
    type: "Elétrica Básica",
    desc: "Instalação/reparo de tomadas, troca de fiação, interruptores, etc",
    date: "12 Out 2023",
    cep: "04571-010",
    status: "3 ORÇAMENTOS",
    statusColor: "bg-secondary text-secondary-foreground",
  },
  {
    id: 2,
    type: "Quadro de Luz",
    desc: "Revisão completa e troca de disjuntores com problemas.",
    date: "14 Out 2023",
    cep: "01310-100",
    status: "AGUARDANDO TÉCNICOS",
    statusColor: "bg-muted text-on-surface",
  },
];

const activeService = {
  technician: "Carlos Silva",
  service: "Manutenção Elétrica sala comercial",
  price: "R$ 450,00",
  status: "EXECUÇÃO",
  progress: 75,
  eta: "Hoje: às 17h",
};

const RequestsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      <GlowBackground />
      <div className="relative z-10 max-w-md mx-auto px-5 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <LogoMark size="sm" />
            <BackToEntry />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-on-surface">🔔</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Bem-vindo de volta</p>
          <h1 className="text-2xl font-extrabold text-on-surface mb-6">Olá, Roberto!</h1>
        </motion.div>

        {/* CTA */}
        <div className="card-elevated p-5 mb-6 primary-gradient">
          <h2 className="text-base font-extrabold text-primary-foreground mb-1">Precisa de um eletricista?</h2>
          <p className="text-xs text-primary-foreground/80 mb-3">Solicite orçamentos com os melhores profissionais.</p>
          <Button
            variant="outline"
            size="sm"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => navigate("/nova-solicitacao")}
          >
            Nova Solicitação +
          </Button>
        </div>

        {/* Minhas Solicitações */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-on-surface">Minhas Solicitações</h2>
          <button className="text-xs font-bold text-primary">Ver todas</button>
        </div>

        <div className="space-y-3 mb-8">
          {requests.map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-elevated p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-on-surface">{req.type}</h3>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${req.statusColor}`}>
                  {req.status}
                </span>
              </div>
              <p className="text-xs text-on-surface/70 mb-2 font-semibold">{req.desc}</p>
              <div className="flex items-center gap-3 text-[10px] text-on-surface/50">
                <span className="flex items-center gap-1"><Calendar size={12} />{req.date}</span>
                <span className="flex items-center gap-1"><MapPin size={12} />CEP: {req.cep}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Serviço em Andamento */}
        <h2 className="text-lg font-extrabold text-on-surface mb-4">Serviços em Andamento</h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-on-surface">
                CS
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-on-surface">{activeService.technician}</h3>
                <p className="text-xs text-on-surface/60">{activeService.service}</p>
              </div>
            </div>
            <span className="text-base font-extrabold text-primary">{activeService.price}</span>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between text-[10px] mb-1">
              <span className="font-bold text-secondary-foreground">STATUS: {activeService.status}</span>
              <span className="font-bold text-on-surface">{activeService.progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full primary-gradient" style={{ width: `${activeService.progress}%` }} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface/60">📍 Previsão: {activeService.eta}</span>
            <Button variant="outline" size="sm" onClick={() => navigate("/chat")}>
              <MessageCircle size={14} /> Chat
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestsPage;
