import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackToEntry = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Reset session and go to entry
    navigate("/perfil");
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-1.5 text-on-surface/70 hover:text-primary transition-colors"
      title="Voltar ao início"
    >
      <LogOut size={20} className="rotate-180" />
      <span className="text-xs font-bold">Sair</span>
    </button>
  );
};

export default BackToEntry;
