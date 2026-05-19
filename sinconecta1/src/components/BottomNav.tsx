import { Home, FileText, MessageCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Início", path: "/home", color: "text-primary" },
  { icon: FileText, label: "Solicitações", path: "/solicitacoes", color: "text-secondary-foreground" },
  { icon: MessageCircle, label: "Chat", path: "/chat", color: "text-accent-foreground" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide nav on entry page and tech registration
  const hidden = ["/", "/perfil", "/cadastro-tecnico"];
  if (hidden.includes(location.pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? `${item.color}`
                  : "text-muted-foreground hover:text-on-surface"
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${
                isActive
                  ? "bg-accent shadow-lg shadow-primary/15"
                  : "hover:bg-accent/50"
              }`}>
                <item.icon size={26} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[11px] ${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
