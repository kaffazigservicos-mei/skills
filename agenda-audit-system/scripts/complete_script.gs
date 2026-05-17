/**
 * SISTEMA DE AUDITORIA DE AGENDA v2.1 - COMPLETO E CORRIGIDO
 * Integração Google Sheets + Google Apps Script + AppSheet
 * 
 * IMPORTANTE: Este é o código COMPLETO para copiar e colar no Google Apps Script
 * Inclui todas as funcionalidades + coluna Status com ícones
 */

// ============================================================================
// 1. CONFIGURAÇÕES GLOBAIS
// ============================================================================

const CONFIG = {
  CALENDAR_ID: "d99416ddabbdee84e4bad0cd319f2f2ef0dc5eb3b0bb3c008b5d6115d315803f@group.calendar.google.com",
  SHEET_DADOS: "Página1",
  SHEET_HISTORICO: "Histórico",
  DATE_FORMAT: "dd/mm/yyyy hh:mm",
  YEAR_START: 2025,
  YEAR_END: 2026
};

// ============================================================================
// 2. MENU PRINCIPAL
// ============================================================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🔄 AGENDA')
    .addItem('📥 Sincronizar com Calendário', 'sincronizarAgendaTeste')
    .addItem('🎨 Adicionar Coluna Status', 'adicionarColunaStatus')
    .addItem('🔄 Sincronizar com AppSheet', 'sincronizarComAppSheet')
    .addItem('🗑️ Limpar Dados', 'limparDados')
    .addItem('🎨 Reformatar Desmaiados', 'reformatarDesmaiados')
    .addSeparator()
    .addItem('📊 Relatório Completo', 'mostrarRelatorioCompleto')
    .addItem('📋 Histórico de Auditoria', 'mostrarHistorico')
    .addSeparator()
    .addItem('⚙️ Configurações', 'mostrarPopupConfig')
    .addToUi();
}

// ============================================================================
// 3. SINCRONIZAÇÃO COM GOOGLE CALENDAR
// ============================================================================

function sincronizarAgendaTeste() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Obter a Página 1 (primeira aba)
  let sheet = ss.getSheetByName(CONFIG.SHEET_DADOS);
  
  // Se não encontrar "Página1", tenta "Sheet1" (nome em inglês)
  if (!sheet) {
    sheet = ss.getSheetByName("Sheet1");
  }
  
  // Se ainda não encontrar, usa a primeira aba disponível
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }
  
  // Limpar dados antigos (mantém cabeçalho)
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 8).clear({ contentsOnly: true });
  }
  
  // Buscar eventos do calendário
  const calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  const eventos = calendar.getEvents(
    new Date(CONFIG.YEAR_START, 0, 1),
    new Date(CONFIG.YEAR_END, 11, 31)
  );

  // Cabeçalho
  const headers = ["ID", "Título", "Início", "Tipo", "Auditado", "Fim", "Data Auditoria", "Auditado Por"];
  sheet.getRange(1, 1, 1, 8).setValues([headers]);
  sheet.getRange(1, 1, 1, 8)
    .setFontWeight("bold")
    .setBackground("#4285f4")
    .setFontColor("white")
    .setHorizontalAlignment("center");

  // Inserir eventos
  eventos.forEach((e, i) => {
    const row = i + 2;
    const id = Utilities.getUuid();
    const titulo = e.getTitle() || "Evento";
    const inicio = e.getStartTime();
    const tipo = e.isRecurringEvent() ? "Recorrente" : "Único";
    const auditado = false;
    const fim = e.getEndTime();
    const dataAuditoria = "";
    const auditadoPor = "";

    sheet.getRange(row, 1, 1, 8).setValues([[
      id, titulo, inicio, tipo, auditado, fim, dataAuditoria, auditadoPor
    ]]);

    // Formatação
    sheet.getRange(row, 1, 1, 8).setFontColor("#333333");
    sheet.getRange(row, 2).setFontWeight("bold");
    sheet.getRange(row, 5).setFontWeight("bold");
    sheet.getRange(row, 3).setNumberFormat(CONFIG.DATE_FORMAT);
    sheet.getRange(row, 6).setNumberFormat(CONFIG.DATE_FORMAT);
    sheet.getRange(row, 7).setNumberFormat(CONFIG.DATE_FORMAT);
  });

  aplicarFormatoDesmaiado(sheet);
  sheet.autoResizeColumns(1, 8);
  sheet.setFrozenRows(1);
  
  // Registrar no histórico
  registrarHistorico(`Sincronização com calendário: ${eventos.length} eventos importados`);
  
  SpreadsheetApp.getUi().alert(`✅ ${eventos.length} eventos sincronizados com sucesso!\n\n📌 Dados estão na Página 1\n✅ AppSheet vai ler automaticamente`);
}

// ============================================================================
// 4. ADICIONAR COLUNA STATUS COM ÍCONES
// ============================================================================

function adicionarColunaStatus() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0]; // Página 1
    
    if (!sheet) {
      SpreadsheetApp.getUi().alert("❌ Planilha não encontrada");
      return;
    }

    const lastRow = sheet.getLastRow();
    
    if (lastRow < 2) {
      SpreadsheetApp.getUi().alert("ℹ️ Sem dados para processar");
      return;
    }

    // Adicionar Header na coluna I
    const headerCell = sheet.getRange(1, 9); // Coluna I
    const headerValue = headerCell.getValue();
    
    if (!headerValue || headerValue.trim() === "") {
      headerCell.setValue("Status");
      headerCell.setFontWeight("bold");
      headerCell.setBackground("#4285f4");
      headerCell.setFontColor("white");
      headerCell.setHorizontalAlignment("center");
    }

    // Preencher coluna I com Status
    let processados = 0;
    
    for (let row = 2; row <= lastRow; row++) {
      const auditadoCell = sheet.getRange(row, 5); // Coluna E (Auditado)
      const statusCell = sheet.getRange(row, 9); // Coluna I (Status)
      
      const auditado = auditadoCell.getValue();
      const statusAtual = statusCell.getValue();
      
      // Se já tem valor, não sobrescreve
      if (statusAtual && statusAtual.trim() !== "") {
        continue;
      }
      
      // Preencher baseado no valor de Auditado
      if (auditado === true || auditado === "true" || auditado === "SIM" || auditado === "YES") {
        // ✅ AUDITADO
        statusCell.setValue("✓ AUDITADO");
        statusCell.setBackground("#E8E8E8"); // Cinza claro
        statusCell.setFontColor("#999999"); // Cinza escuro
        statusCell.setFontStyle("italic");
      } else {
        // ⏳ PENDENTE
        statusCell.setValue("⏳ PENDENTE");
        statusCell.setBackground("#FFF3E0"); // Laranja claro
        statusCell.setFontColor("#FF9800"); // Laranja
        statusCell.setFontWeight("bold");
      }
      
      // Centralizar texto
      statusCell.setHorizontalAlignment("center");
      processados++;
    }

    // Ajustar largura da coluna
    sheet.setColumnWidth(9, 150);

    // Registrar no histórico
    registrarHistorico(`Coluna "Status" adicionada com ${processados} eventos`);

    // Mensagem de sucesso
    SpreadsheetApp.getUi().alert(`✅ Coluna "Status" adicionada com sucesso!\n\n📊 ${processados} eventos processados\n✓ Auditados: Cinza\n⏳ Pendentes: Laranja\n\n📱 AppSheet vai sincronizar automaticamente`);
    
  } catch (e) {
    SpreadsheetApp.getUi().alert(`❌ Erro: ${e.toString()}`);
  }
}

// ============================================================================
// 5. FORMATAÇÃO DE DESMAIADO
// ============================================================================

function aplicarFormatoDesmaiado(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  for (let row = 2; row <= lastRow; row++) {
    const cell = sheet.getRange(row, 5);
    const valor = cell.getValue();

    if (valor === true || valor === "true" || valor === "SIM" || valor === "YES") {
      // ✅ AUDITADO - DESMAIADO
      sheet.getRange(row, 1, 1, 8)
        .setBackground("#E8E8E8")
        .setFontColor("#999999")
        .setFontStyle("italic");
      
      cell.setValue(true)
        .setFontWeight("bold")
        .setBackground("#4CAF50")
        .setFontColor("white")
        .setNote("✅ Auditado");
    } else {
      // ❌ PENDENTE - ATIVO
      sheet.getRange(row, 1, 1, 8)
        .setBackground(null)
        .setFontColor("#333333")
        .setFontStyle("normal");
      
      cell.setValue(false)
        .setFontWeight("bold")
        .setBackground("#FF9800")
        .setFontColor("white")
        .setNote("⏳ Pendente");
    }
  }
}

// ============================================================================
// 6. SINCRONIZAÇÃO BIDIRECIONAL COM APPSHEET
// ============================================================================

function sincronizarComAppSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0]; // Primeira aba (Página 1)
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert("❌ Planilha não encontrada");
    return;
  }

  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
  let sincronizados = 0;
  let erros = 0;

  data.forEach((row, index) => {
    try {
      const id = row[0];
      const auditado = row[4];
      const dataAuditoria = row[6];
      const auditadoPor = row[7];

      // Validar dados
      if (!id || id.trim() === "") {
        erros++;
        return;
      }

      sincronizados++;

      // Se auditado, registrar no histórico
      if (auditado === true && !dataAuditoria) {
        const hoje = new Date();
        sheet.getRange(index + 2, 7).setValue(hoje);
        sheet.getRange(index + 2, 8).setValue(Session.getActiveUser().getEmail());
      }
    } catch (e) {
      erros++;
      console.error(`Erro na linha ${index + 2}: ${e.message}`);
    }
  });

  registrarHistorico(`Sincronização AppSheet: ${sincronizados} registros sincronizados, ${erros} erros`);
  SpreadsheetApp.getUi().alert(`✅ Sincronização concluída!\n✅ Sincronizados: ${sincronizados}\n⚠️ Erros: ${erros}`);
}

// ============================================================================
// 7. LIMPEZA DE DADOS
// ============================================================================

function limparDados() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    "⚠️ Tem certeza que deseja limpar todos os dados?",
    ui.ButtonSet.YES_NO
  );

  if (response === ui.Button.YES) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet && sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).clear({ contentsOnly: true });
      registrarHistorico("Dados limpos");
      ui.alert("🗑️ Dados limpos com sucesso");
    }
  }
}

// ============================================================================
// 8. REFORMATAÇÃO
// ============================================================================

function reformatarDesmaiados() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet) {
    aplicarFormatoDesmaiado(sheet);
    registrarHistorico("Formatação reaplicada");
    SpreadsheetApp.getUi().alert("✅ Formatação reaplicada com sucesso");
  }
}

// ============================================================================
// 9. RELATÓRIO COMPLETO COM FILTROS
// ============================================================================

function mostrarRelatorioCompleto() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  if (!sheet || sheet.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert("ℹ️ Sem dados para gerar relatório");
    return;
  }

  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
  
  // Cálculos
  const total = data.length;
  const auditados = data.filter(row => row[4] === true).length;
  const pendentes = total - auditados;
  const hoje = new Date();
  const eventosHoje = data.filter(row => {
    const dataEvento = new Date(row[2]);
    return dataEvento.toDateString() === hoje.toDateString();
  }).length;

  // Percentual
  const percentualAuditado = total > 0 ? ((auditados / total) * 100).toFixed(1) : 0;

  const relatorio = `
📊 RELATÓRIO DE AUDITORIA DE AGENDA
=====================================

📈 RESUMO GERAL:
  • Total de Eventos: ${total}
  • ✅ Auditados: ${auditados} (${percentualAuditado}%)
  • ⏳ Pendentes: ${pendentes}
  • 📅 Eventos Hoje: ${eventosHoje}

🎯 MÉTRICAS:
  • Taxa de Conclusão: ${percentualAuditado}%
  • Eventos Únicos: ${data.filter(r => r[3] === "Único").length}
  • Eventos Recorrentes: ${data.filter(r => r[3] === "Recorrente").length}

⏰ ÚLTIMA ATUALIZAÇÃO: ${new Date().toLocaleString('pt-BR')}

📌 NOTA: Dados armazenados na Página 1
✅ AppSheet sincroniza automaticamente
  `;

  SpreadsheetApp.getUi().alert(relatorio);
}

// ============================================================================
// 10. HISTÓRICO DE AUDITORIA
// ============================================================================

function mostrarHistorico() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let histSheet = ss.getSheetByName(CONFIG.SHEET_HISTORICO);

  if (!histSheet) {
    SpreadsheetApp.getUi().alert("ℹ️ Histórico vazio");
    return;
  }

  const data = histSheet.getRange(2, 1, histSheet.getLastRow() - 1, 3).getValues();
  let historico = "📋 HISTÓRICO DE AUDITORIA\n\n";

  data.forEach(row => {
    historico += `${row[0]} - ${row[1]}\n${row[2]}\n\n`;
  });

  SpreadsheetApp.getUi().alert(historico);
}

function registrarHistorico(acao) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let histSheet = ss.getSheetByName(CONFIG.SHEET_HISTORICO);

  if (!histSheet) {
    histSheet = ss.insertSheet(CONFIG.SHEET_HISTORICO);
    histSheet.getRange(1, 1, 1, 3).setValues([["Data/Hora", "Ação", "Usuário"]]);
    histSheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#4285f4").setFontColor("white");
  }

  const row = histSheet.getLastRow() + 1;
  histSheet.getRange(row, 1).setValue(new Date());
  histSheet.getRange(row, 2).setValue(acao);
  histSheet.getRange(row, 3).setValue(Session.getActiveUser().getEmail());

  histSheet.getRange(row, 1).setNumberFormat(CONFIG.DATE_FORMAT);
}

// ============================================================================
// 11. CONFIGURAÇÕES
// ============================================================================

function mostrarPopupConfig() {
  const ui = SpreadsheetApp.getUi();
  const config = `
⚙️ CONFIGURAÇÕES DO SISTEMA
============================

📱 INTEGRAÇÃO APPSHEET:
  • Dados na: Página 1 (padrão)
  • Coluna "Auditado" = Yes/No
  • Sincronização automática ativada
  • Desmaio automático de linhas
  • Coluna "Status" com ícones

📊 FUNCIONALIDADES:
  ✅ Sincronização com Google Calendar
  ✅ Relatórios avançados
  ✅ Histórico de auditoria
  ✅ Sincronização bidirecional
  ✅ Coluna Status com ícones

🔧 ESTRUTURA:
  • Página 1: Dados principais
  • Histórico: Log de ações
  • AppSheet: Lê automaticamente Página 1

📌 IMPORTANTE:
  AppSheet conecta automaticamente à Página 1
  Não crie outras abas de dados!
  `;

  ui.alert(config);
}

// ============================================================================
// 12. TRIGGERS (EDIÇÃO EM TEMPO REAL)
// ============================================================================

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Verificar se é a Página 1 e coluna "Auditado" (coluna 5)
  if (sheet === ss.getSheets()[0] && e.range.getColumn() === 5) {
    const row = e.range.getRow();
    
    if (row < 2) return; // Pular header
    
    aplicarFormatoDesmaiado(sheet);
    
    // Atualizar coluna Status (coluna I) se existir
    const statusCell = sheet.getRange(row, 9);
    const auditado = e.range.getValue();
    
    if (auditado === true) {
      statusCell.setValue("✓ AUDITADO");
      statusCell.setBackground("#E8E8E8");
      statusCell.setFontColor("#999999");
      statusCell.setFontStyle("italic");
    } else {
      statusCell.setValue("⏳ PENDENTE");
      statusCell.setBackground("#FFF3E0");
      statusCell.setFontColor("#FF9800");
      statusCell.setFontWeight("bold");
    }
    
    statusCell.setHorizontalAlignment("center");
    
    // Registrar no histórico
    const titulo = sheet.getRange(row, 2).getValue();
    registrarHistorico(`Evento auditado: ${titulo}`);
  }
}

// ============================================================================
// 13. FUNÇÕES AUXILIARES
// ============================================================================

function gerarUUID() {
  return Utilities.getUuid();
}

function formatarData(data) {
  return Utilities.formatDate(data, Session.getScriptTimeZone(), CONFIG.DATE_FORMAT);
}
