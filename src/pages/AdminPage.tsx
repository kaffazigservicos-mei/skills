import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Download, RefreshCw, Users, Wrench, MessageCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import LogoMark from "@/components/LogoMark";
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

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const onlyDigits = (s: string) => (s || "").replace(/\D/g, "");

const AdminPage = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clicksTotal, setClicksTotal] = useState<Record<string, number>>({});
  const [clicksFiltered, setClicksFiltered] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const now = new Date();
  const [month, setMonth] = useState<number>(now.getMonth()); // 0-11
  const [year, setYear] = useState<number>(now.getFullYear());

  const load = async () => {
    setLoading(true);
    const [{ data: t }, { data: c }, { data: clicks }] = await Promise.all([
      supabase.rpc("admin_list_professionals"),
      supabase.rpc("admin_list_clients"),
      supabase.rpc("admin_list_clicks"),
    ]);
    setTecnicos((t || []) as Tecnico[]);
    setClientes((c || []) as Cliente[]);

    const total: Record<string, number> = {};
    const filtered: Record<string, number> = {};
    (clicks || []).forEach((k: { profissional_id: string; created_at: string }) => {
      total[k.profissional_id] = (total[k.profissional_id] || 0) + 1;
      const d = new Date(k.created_at);
      if (d.getMonth() === month && d.getFullYear() === year) {
        filtered[k.profissional_id] = (filtered[k.profissional_id] || 0) + 1;
      }
    });
    setClicksTotal(total);
    setClicksFiltered(filtered);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  const validateAndNotify = async (tec: Tecnico) => {
    setUpdatingId(tec.id);
    const { error } = await supabase.rpc("admin_set_status", { _id: tec.id, _status: "verificado" });
    setUpdatingId(null);
    if (error) {
      toast.error("Erro ao validar técnico.");
      return;
    }
    setTecnicos((prev) => prev.map((x) => (x.id === tec.id ? { ...x, status_validacao: "verificado" } : x)));
    toast.success(`${tec.nome_completo} validado com sucesso!`);

    if (tec.whatsapp) {
      const num = onlyDigits(tec.whatsapp);
      const msg = encodeURIComponent(
        "Olá! Seu cadastro na plataforma SINCONECTA foi validado com sucesso. Você já está visível para receber chamados na sua região!"
      );
      window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
    } else {
      toast.info("Profissional sem WhatsApp cadastrado — notificação não enviada.");
    }
  };

  const revertToPending = async (tec: Tecnico) => {
    setUpdatingId(tec.id);
    const { error } = await supabase.rpc("admin_set_status", { _id: tec.id, _status: "pendente" });
    setUpdatingId(null);
    if (error) {
      toast.error("Erro ao atualizar status.");
      return;
    }
    setTecnicos((prev) => prev.map((x) => (x.id === tec.id ? { ...x, status_validacao: "pendente" } : x)));
    toast.success("Técnico movido para Aguardando Validação.");
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
      [`Clientes Enviados (${MESES[month]}/${year})`]: clicksFiltered[t.id] || 0,
      "Clientes Enviados (Total)": clicksTotal[t.id] || 0,
      "Data de Cadastro": new Date(t.created_at).toLocaleString("pt-BR"),
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tecRows), "Tecnicos");

    const cliRows = clientes.map((c) => ({
      Nome: c.nome,
      WhatsApp: c.whatsapp || "",
      CEP: c.cep || "",
      "Data de Cadastro": new Date(c.created_at).toLocaleString("pt-BR"),
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(cliRows), "Clientes");
    XLSX.writeFile(wb, `sinconecta-export-${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success("Planilha exportada!");
  };

  const pendentes = tecnicos.filter((t) => t.status_validacao !== "verificado");
  const ativos = tecnicos.filter((t) => t.status_validacao === "verificado");

  const renderTecnicoCard = (tec: Tecnico) => {
    const verified = tec.status_validacao === "verificado";
    const filt = clicksFiltered[tec.id] || 0;
    const total = clicksTotal[tec.id] || 0;
    return (
      <div
        key={tec.id}
        className="rounded-2xl p-4 bg-card/70 backdrop-blur-xl border border-primary/15 shadow-[0_10px_40px_-12px_rgba(0,61,155,0.2)]"
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <h3 className="text-base font-extrabold text-on-surface">{tec.nome_completo}</h3>
            <p className="text-xs text-on-surface/60 font-semibold">
              CPF/CFT: {tec.cpf_cft} · CEP: {tec.cep || "—"} · WhatsApp: {tec.whatsapp || "—"}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {(tec.especialidades || []).map((e) => (
                <span key={e} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                  {e}
                </span>
              ))}
            </div>
          </div>
          <span
            className={`text-[10px] font-extrabold px-2 py-1 rounded-full inline-flex items-center gap-1 ${
              verified ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {verified ? <CheckCircle2 size={12} /> : <Clock size={12} />}
            {verified ? "VERIFICADO" : "PENDENTE"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="rounded-xl bg-primary/5 border border-primary/15 px-3 py-2 flex items-center gap-2">
            <MessageCircle size={16} className="text-primary" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface/60">
                {MESES[month]}/{year}
              </p>
              <p className="text-base font-extrabold text-primary leading-none">{filt}</p>
            </div>
          </div>
          <div className="rounded-xl bg-secondary/15 border border-secondary/30 px-3 py-2 flex items-center gap-2">
            <MessageCircle size={16} className="text-secondary-foreground" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface/60">Total</p>
              <p className="text-base font-extrabold text-on-surface leading-none">{total}</p>
            </div>
          </div>
        </div>

        {verified ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3"
            disabled={updatingId === tec.id}
            onClick={() => revertToPending(tec)}
          >
            {updatingId === tec.id ? "Atualizando..." : "Mover para Pendente"}
          </Button>
        ) : (
          <Button
            variant="hero"
            size="sm"
            className="w-full mt-3"
            disabled={updatingId === tec.id}
            onClick={() => validateAndNotify(tec)}
          >
            {updatingId === tec.id ? "Validando..." : "Validar e notificar via WhatsApp"}
          </Button>
        )}
      </div>
    );
  };

  const years = Array.from({ length: 6 }, (_, i) => now.getFullYear() - i);

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      <GlowBackground />
      <div className="relative z-10 max-w-3xl mx-auto px-5 pt-6">
        <div className="flex flex-col items-center mb-6">
          <LogoMark size="xl" />
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <h1 className="text-2xl font-extrabold text-on-surface">Painel Administrativo</h1>
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

        {/* Filtros mês/ano */}
        <div className="card-elevated p-4 mb-6 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-bold text-on-surface">Filtrar métricas:</span>
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="h-10 px-3 rounded-xl border-2 border-border bg-background text-sm font-semibold"
          >
            {MESES.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="h-10 px-3 rounded-xl border-2 border-border bg-background text-sm font-semibold"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Aguardando Validação */}
        <div className="flex items-center gap-2 mb-3">
          <Clock size={18} className="text-amber-600" />
          <h2 className="text-lg font-extrabold text-on-surface">
            Aguardando Validação ({pendentes.length})
          </h2>
        </div>
        <div className="space-y-3 mb-8">
          {pendentes.length === 0 && !loading && (
            <p className="text-sm text-on-surface/60 font-semibold">Nenhum técnico pendente.</p>
          )}
          {pendentes.map(renderTecnicoCard)}
        </div>

        {/* Técnicos Ativos */}
        <div className="flex items-center gap-2 mb-3">
          <Wrench size={18} className="text-primary" />
          <h2 className="text-lg font-extrabold text-on-surface">
            Técnicos Ativos ({ativos.length})
          </h2>
        </div>
        <div className="space-y-3 mb-8">
          {ativos.length === 0 && !loading && (
            <p className="text-sm text-on-surface/60 font-semibold">Nenhum técnico ativo.</p>
          )}
          {ativos.map(renderTecnicoCard)}
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
