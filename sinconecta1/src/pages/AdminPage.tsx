import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Download, RefreshCw, Users, Wrench } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/LogoMark";
import BackToEntry from "@/components/BackToEntry";
import GlowBackground from "@/components/GlowBackground";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Tecnico = {
  id: string;
  nome_completo: string;
  cpf_cft: string;
  whatsapp: string | null;
  cep: string | null;
  especialidades: string[] | null;
  status_validacao: string;
  created_at: string;
};

type Cliente = {
  id: string;
  nome: string;
  whatsapp: string | null;
  cep: string | null;
  created_at: string;
};

const AdminPage = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const [{ data: t }, { data: c }] = await Promise.all([
      supabase.from("profissionais").select("*").order("created_at", { ascending: false }),
      supabase.from("clientes").select("*").order("created_at", { ascending: false }),
    ]);
    setTecnicos((t || []) as Tecnico[]);
    setClientes((c || []) as Cliente[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = async (tec: Tecnico) => {
    const next = tec.status_validacao === "verificado" ? "pendente" : "verificado";
    setUpdatingId(tec.id);
    const { error } = await supabase
      .from("profissionais")
      .update({ status_validacao: next })
      .eq("id", tec.id);
    setUpdatingId(null);
    if (error) {
      toast.error("Erro ao atualizar status.");
      return;
    }
    setTecnicos((prev) => prev.map((x) => (x.id === tec.id ? { ...x, status_validacao: next } : x)));
    toast.success(`Técnico marcado como ${next === "verificado" ? "Verificado" : "Pendente"}.`);
  };

  const exportXlsx = () => {
    const wb = XLSX.utils.book_new();

    const tecRows = tecnicos.map((t) => ({
      Nome: t.nome_completo,
      "CPF/CFT": t.cpf_cft,
      WhatsApp: t.whatsapp || "",
      CEP: t.cep || "",
      Especialidades: (t.especialidades || []).join(", "),
      Status: t.status_validacao,
      "Data de Cadastro": new Date(t.created_at).toLocaleString("pt-BR"),
    }));
    const wsT = XLSX.utils.json_to_sheet(tecRows);
    XLSX.utils.book_append_sheet(wb, wsT, "Tecnicos");

    const cliRows = clientes.map((c) => ({
      Nome: c.nome,
      WhatsApp: c.whatsapp || "",
      CEP: c.cep || "",
      "Data de Cadastro": new Date(c.created_at).toLocaleString("pt-BR"),
    }));
    const wsC = XLSX.utils.json_to_sheet(cliRows);
    XLSX.utils.book_append_sheet(wb, wsC, "Clientes");

    XLSX.writeFile(wb, `sinconecta-export-${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success("Planilha exportada!");
  };

  const statusBadge = (status: string) => {
    const verified = status === "verificado";
    return (
      <span
        className={`text-[10px] font-extrabold px-2 py-1 rounded-full inline-flex items-center gap-1 ${
          verified
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {verified ? <CheckCircle2 size={12} /> : <Clock size={12} />}
        {verified ? "VERIFICADO" : "PENDENTE"}
      </span>
    );
  };

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      <GlowBackground />
      <div className="relative z-10 max-w-3xl mx-auto px-5 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BackToEntry />
            <LogoMark size="sm" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Atualizar
            </Button>
            <Button variant="hero" size="sm" onClick={exportXlsx}>
              <Download size={14} />
              Exportar XLSX
            </Button>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-on-surface mb-1">Painel Administrativo</h1>
        <p className="text-sm text-on-surface/60 font-semibold mb-6">
          Validação manual de técnicos e gestão de cadastros.
        </p>

        {/* Técnicos */}
        <div className="flex items-center gap-2 mb-3">
          <Wrench size={18} className="text-primary" />
          <h2 className="text-lg font-extrabold text-on-surface">
            Técnicos ({tecnicos.length})
          </h2>
        </div>
        <div className="space-y-3 mb-8">
          {tecnicos.length === 0 && !loading && (
            <p className="text-sm text-on-surface/60 font-semibold">Nenhum técnico cadastrado.</p>
          )}
          {tecnicos.map((tec) => {
            const verified = tec.status_validacao === "verificado";
            return (
              <div key={tec.id} className="card-elevated p-4 border-2 border-border">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <h3 className="text-base font-extrabold text-on-surface">{tec.nome_completo}</h3>
                    <p className="text-xs text-on-surface/60 font-semibold">
                      CPF/CFT: {tec.cpf_cft} · CEP: {tec.cep || "—"} · WhatsApp: {tec.whatsapp || "—"}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(tec.especialidades || []).map((e) => (
                        <span
                          key={e}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-accent-foreground"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                  {statusBadge(tec.status_validacao)}
                </div>
                <Button
                  variant={verified ? "outline" : "hero"}
                  size="sm"
                  className="w-full mt-2"
                  disabled={updatingId === tec.id}
                  onClick={() => toggleStatus(tec)}
                >
                  {updatingId === tec.id
                    ? "Atualizando..."
                    : verified
                    ? "Marcar como Pendente"
                    : "Marcar como Verificado"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Clientes */}
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-primary" />
          <h2 className="text-lg font-extrabold text-on-surface">
            Clientes ({clientes.length})
          </h2>
        </div>
        <div className="card-elevated border-2 border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr className="text-left">
                  <th className="px-4 py-3 font-extrabold text-on-surface">Nome</th>
                  <th className="px-4 py-3 font-extrabold text-on-surface">CEP</th>
                  <th className="px-4 py-3 font-extrabold text-on-surface">WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {clientes.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-4 text-on-surface/60 font-semibold">
                      Nenhum cliente cadastrado.
                    </td>
                  </tr>
                )}
                {clientes.map((c) => (
                  <tr key={c.id} className="border-t border-border">
                    <td className="px-4 py-3 font-bold text-on-surface">{c.nome}</td>
                    <td className="px-4 py-3 text-on-surface/80 font-semibold">{c.cep || "—"}</td>
                    <td className="px-4 py-3 text-on-surface/80 font-semibold">{c.whatsapp || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
