import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import SplashPage from "./pages/SplashPage";
import EntryPage from "./pages/EntryPage";
import HomePage from "./pages/HomePage";
import NewRequestPage from "./pages/NewRequestPage";
import RequestsPage from "./pages/RequestsPage";
import ChatPage from "./pages/ChatPage";
import TechRegistrationPage from "./pages/TechRegistrationPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/perfil" element={<EntryPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/solicitacoes" element={<RequestsPage />} />
          <Route path="/nova-solicitacao" element={<NewRequestPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/cadastro-tecnico" element={<TechRegistrationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
