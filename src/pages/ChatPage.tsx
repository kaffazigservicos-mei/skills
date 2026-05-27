import { useState } from "react";
import { Phone, Video, Send, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackToEntry from "@/components/BackToEntry";
import LogoMark from "@/components/LogoMark";
import GlowBackground from "@/components/GlowBackground";
import { motion } from "framer-motion";

const TECH_WHATSAPP = "5511999999999";

const initialMessages = [
  {
    id: 1,
    sender: "tech",
    text: "Olá! Verifiquei o quadro elétrico principal. Encontrei alguns componentes desgastados que precisam de substituição imediata.",
    time: "09:42",
  },
  {
    id: 2,
    sender: "user",
    text: "Entendido, Ricardo. Pode me enviar uma foto para eu ver o estado atual?",
    time: "09:44",
  },
  {
    id: 3,
    sender: "tech",
    text: "Este é o estado do disjuntor principal. Note o sinal de superaquecimento nos terminais.",
    time: "09:47",
    hasImage: true,
  },
  {
    id: 4,
    sender: "tech",
    text: "Já preparei o orçamento para as peças novas. Posso prosseguir com a troca?",
    time: "09:48",
  },
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const openWhatsApp = () => {
    const msg = encodeURIComponent("Olá, vi seu perfil no SIN Conecta e preciso de suporte.");
    window.open(`https://wa.me/${TECH_WHATSAPP}?text=${msg}`, "_blank");
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <GlowBackground />
      
      {/* Header */}
      <div className="relative z-10 bg-card shadow-md px-4 py-3 flex items-center gap-3">
        <BackToEntry />
        <LogoMark size="sm" />
        <div className="w-10 h-10 rounded-full primary-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">
          RS
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-extrabold text-on-surface">Ricardo Silva (Eletricista)</h2>
          <span className="text-xs font-bold text-primary">Online</span>
        </div>
        <button
          onClick={openWhatsApp}
          className="w-9 h-9 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shadow-md shadow-[#25D366]/10"
        >
          <Phone size={18} />
        </button>
        <button className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-primary shadow-md shadow-primary/10">
          <Video size={18} />
        </button>
      </div>

      {/* Date */}
      <div className="relative z-10 flex justify-center py-3">
        <span className="text-[10px] font-bold text-on-surface/50 bg-card px-3 py-1 rounded-full shadow-sm">HOJE</span>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-20 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3.5 rounded-3xl shadow-lg ${
                msg.sender === "user"
                  ? "primary-gradient text-primary-foreground rounded-br-lg shadow-primary/20"
                  : "bg-secondary/20 text-on-surface rounded-bl-lg border border-secondary/30 shadow-secondary/10"
              }`}
            >
              {msg.sender === "tech" && (
                <p className="text-[10px] font-bold text-primary mb-1">Ricardo Silva</p>
              )}
              <p className="text-sm leading-relaxed">{msg.text}</p>
              {msg.hasImage && (
                <div className="mt-2 w-full h-40 rounded-2xl bg-on-surface/10 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <Image size={32} className="mx-auto mb-1 opacity-40" />
                    <span className="text-xs opacity-50">Foto do disjuntor</span>
                  </div>
                </div>
              )}
              <p className={`text-[10px] mt-1.5 ${msg.sender === "user" ? "text-primary-foreground/60" : "text-on-surface/40"} text-right`}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-card border-t border-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary flex-shrink-0 shadow-md shadow-primary/10">
            <Image size={18} />
          </button>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 h-10 px-4 rounded-2xl border border-border bg-background text-on-surface text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-primary-foreground flex-shrink-0 shadow-lg shadow-primary/20">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
