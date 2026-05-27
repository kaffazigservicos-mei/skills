import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hidden = ["/", "/perfil", "/cadastro-tecnico", "/home", "/admin"];
  if (hidden.includes(location.pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-card/70 border-t border-white/30 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-center py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-all text-primary font-bold shadow-md shadow-primary/10"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
          <span className="text-sm">Voltar</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
