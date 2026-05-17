---
name: agenda-audit-system
description: Construir um sistema completo de auditoria de agenda usando Google Calendar, Google Sheets, Google Apps Script e AppSheet, totalmente gratuito e sem código. Use quando precisar rastrear, auditar e gerenciar eventos de calendário com status visual, sincronização bidirecional e relatórios automáticos. Inclui código Google Apps Script completo, guia de configuração AppSheet e instruções passo-a-passo para iniciantes.
---

# Sistema de Auditoria de Agenda

## Visão Geral

O **Sistema de Auditoria de Agenda** é uma solução completa e gratuita para rastrear e auditar eventos de calendário. Sincroniza eventos do Google Calendar para Google Sheets, fornece rastreamento visual de status (auditado/pendente), e integra com AppSheet para acesso mobile. O sistema inclui relatórios automáticos, histórico de auditoria e sincronização bidirecional.

**Perfeito para**: Auditoria de eventos, gestão de calendário, rastreamento de conformidade, supervisão de agendamento de equipes.

## Capacidades Principais

### 1. Sincronização Automática com Calendário
- Importar eventos do Google Calendar para Google Sheets com um clique
- Sincronização automática na execução do script
- Intervalo de datas customizável (filtragem por ano)
- Preserva metadados do evento (título, hora início, hora fim, tipo de recorrência)

### 2. Rastreamento Visual de Status
- Coluna de status com código de cores: ✓ AUDITADO (cinza) vs ⏳ PENDENTE (laranja)
- Desmaio automático de linhas auditadas (feedback visual)
- Atualizações de status em tempo real ao editar Google Sheets
- Ícones e formatação para varredura visual rápida

### 3. Sincronização Bidirecional com AppSheet
- AppSheet lê diretamente do Google Sheets (Página 1)
- Mudanças no AppSheet atualizam automaticamente Sheets
- 4 Views pré-configuradas: Pendentes, Auditados, Todos, Hoje
- Interface mobile-friendly para auditoria em qualquer lugar

### 4. Relatórios e Histórico Automáticos
- Relatórios de auditoria em tempo real (total, auditados, pendentes, % conclusão)
- Log de histórico de auditoria com timestamps e atribuição de usuário
- Geração de relatório com um clique
- Rastreamento histórico de todas as ações

## Início Rápido

### Pré-requisitos
- Conta Google com Calendar e Sheets
- Conta AppSheet (gratuita)
- 30 minutos de tempo
- Nenhum conhecimento de programação necessário

### Configuração em 5 Passos

**Passo 1: Criar Google Sheets**
1. Vá para sheets.google.com
2. Criar nova planilha em branco
3. Nomear como "Auditoria de Agenda 2026"

**Passo 2: Adicionar Cabeçalhos de Coluna**
Criar 8 colunas na linha 1:
- A: ID
- B: Título
- C: Início
- D: Tipo
- E: Auditado
- F: Fim
- G: Data Auditoria
- H: Auditado Por

**Passo 3: Adicionar Google Apps Script**
1. Clique em Extensões → Apps Script
2. Copie o script completo da seção **Código Google Apps Script**
3. Cole no editor e Salve

**Passo 4: Configurar ID do Calendário**
1. Vá para configurações do Google Calendar
2. Encontre seu ID do Calendário (parece: `xxx@group.calendar.google.com`)
3. No Apps Script, encontre a linha com `CALENDAR_ID: "..."`
4. Substitua pelo seu ID do Calendário
5. Salve

**Passo 5: Executar Sincronização Inicial**
1. No Apps Script, selecione função: `sincronizarAgendaTeste`
2. Clique em Executar (▶️)
3. Autorize quando solicitado
4. Verifique Google Sheets para eventos importados

### Conectar com AppSheet

1. Vá para appsheet.com e cadastre-se (gratuito)
2. Clique em "Criar Novo App" → "Começar com dados" → "Google Sheets"
3. Autorize AppSheet a acessar sua conta Google
4. Selecione sua planilha "Auditoria de Agenda 2026"
5. AppSheet cria o app automaticamente
6. Crie 4 Views: ⏳ Pendentes, ✅ Auditados, 📋 Todos, 📅 Hoje
7. Clique em Preview para testar

## Árvore de Decisão de Fluxo de Trabalho

### Eu quero...

**...importar eventos do meu calendário**
→ Use menu: 🔄 AGENDA → 📥 Sincronizar com Calendário

**...marcar um evento como auditado**
→ No AppSheet: Clique no evento → Mude "Auditado" para SIM → Salve
→ Linha automaticamente fica cinza e move para view "✅ Auditados"

**...ver meu progresso de auditoria**
→ Use menu: 🔄 AGENDA → 📊 Relatório Completo
→ Mostra: Total de eventos, % auditados, contagem pendentes, eventos hoje

**...visualizar histórico de auditoria**
→ Use menu: 🔄 AGENDA → 📋 Histórico de Auditoria
→ Mostra: Todas as ações com timestamps e atribuição de usuário

**...mudar o ano (2026 → 2027)**
→ Abra Apps Script
→ Encontre: `YEAR_START: 2026` e `YEAR_END: 2026`
→ Mude ambos para `2027`
→ Salve e execute sincronização novamente

**...adicionar coluna de status com ícones**
→ Use menu: 🔄 AGENDA → 🎨 Adicionar Coluna Status
→ Cria coluna I com ✓ AUDITADO / ⏳ PENDENTE

## Arquitetura Técnica

### Fluxo de Dados
```
Google Calendar
      ↓
Google Apps Script (sincronização)
      ↓
Google Sheets (Página 1)
      ↓
AppSheet (lê/escreve)
      ↓
App Mobile (interface do usuário)
```

### Estrutura do Google Sheets
- **Página 1**: Tabela de dados principal (8 colunas)
- **Histórico**: Log de auditoria (auto-criado, 3 colunas: Data/Hora, Ação, Usuário)

### Recursos Principais do Script
- **onOpen()**: Cria menu com 8 funções
- **sincronizarAgendaTeste()**: Função principal de sincronização
- **adicionarColunaStatus()**: Adiciona coluna de status visual
- **aplicarFormatoDesmaiado()**: Desmaio automático de linhas auditadas
- **onEdit()**: Atualizações em tempo real quando células mudam
- **mostrarRelatorioCompleto()**: Gera relatório de auditoria
- **registrarHistorico()**: Registra todas as ações

## Configuração

### ID do Calendário
Localizado em Configurações do Google Calendar → Seu calendário → ID do calendário
Formato: `xxxxx@group.calendar.google.com`

### Intervalo de Ano
No Google Apps Script, linhas 18-19:
```javascript
YEAR_START: 2026,
YEAR_END: 2026
```
Mude ambos para corresponder ao seu ano de auditoria.

### Nomes de Abas
- Dados principais: "Página 1" (ou "Sheet1" em inglês)
- Histórico: "Histórico" (auto-criado)

## Tarefas Comuns

### Tarefa: Auditar Múltiplos Eventos
1. Abra o app AppSheet
2. Vá para view ⏳ Pendentes
3. Clique em cada evento
4. Mude "Auditado" para SIM
5. Clique em Salvar
6. Evento automaticamente fica cinza e move para ✅ Auditados

### Tarefa: Gerar Relatório Semanal
1. Clique 🔄 AGENDA → 📊 Relatório Completo
2. Anote a porcentagem de conclusão
3. Compartilhe com equipe se necessário

### Tarefa: Exportar Dados de Auditoria
1. Abra Google Sheets
2. Selecione todos os dados (Ctrl+A)
3. Copie (Ctrl+C)
4. Cole no Excel ou exporte como CSV

### Tarefa: Resetar Todos os Dados
1. Clique 🔄 AGENDA → 🗑️ Limpar Dados
2. Confirme exclusão
3. Todos os dados limpos (cabeçalho permanece)

## Solução de Problemas

| Problema | Solução |
|----------|---------|
| "ID do Calendário inválido" | Copie o ID do Calendário novamente das configurações do Google Calendar |
| Nenhum evento importado | Verifique se tem eventos no Google Calendar para o ano selecionado |
| AppSheet mostra sem dados | Clique Atualizar no AppSheet; aguarde 30 segundos para sincronização |
| Linhas não ficam cinzas | Clique 🔄 AGENDA → 🎨 Reformatar Desmaiados |
| Coluna de status faltando | Clique 🔄 AGENDA → 🎨 Adicionar Coluna Status |

## Customização

### Mudar Cores
No Google Apps Script, encontre chamadas `setBackground()` e modifique cores hex:
- Linhas auditadas: `#E8E8E8` (cinza)
- Linhas pendentes: `#FFF3E0` (laranja)
- Cabeçalho: `#4285f4` (azul)

### Adicionar Colunas Customizadas
1. Adicione cabeçalho de coluna em Página 1
2. Atualize array `headers` no script (linha 65)
3. Atualize contagem de colunas em chamadas `setValues()` (mude 8 para 9, etc.)

### Filtrar por Tipo de Evento
Em `sincronizarAgendaTeste()`, adicione filtro antes de inserir:
```javascript
if (e.getTitle().includes("AUDIT")) {
  // apenas importa eventos com "AUDIT" no título
}
```

## Melhores Práticas

1. **Sincronizar regularmente**: Mantenha calendário sincronizado com Sheets semanalmente
2. **Auditar prontamente**: Marque eventos como auditados dentro de 24 horas
3. **Revisar relatórios**: Verifique % de conclusão semanalmente
4. **Arquivar anos antigos**: Crie abas separadas para cada ano
5. **Compartilhar AppSheet**: Convide membros da equipe para o app AppSheet para auditoria colaborativa

## Recursos

Esta skill inclui:

### scripts/
- `complete_script.gs` - Código Google Apps Script completo (pronto para copiar/colar)

### references/
- `appsheet_setup.md` - Guia detalhado de configuração AppSheet
- `troubleshooting.md` - Troubleshooting estendido e FAQ

### templates/
- `beginner_guide.md` - Guia passo-a-passo para usuários não-técnicos
- `sample_data.csv` - Dados de calendário de exemplo para teste

## Limitações e Notas

- **Limites de tier gratuito**: Google Apps Script tem limites de tempo de execução (6 min/execução)
- **Plano gratuito AppSheet**: Limitado a 10 linhas por tabela (upgrade para mais)
- **Sincronização de calendário**: Unidirecional de Calendar para Sheets (edições manuais em Sheets não sincronizam de volta para Calendar)
- **Atualizações em tempo real**: AppSheet atualiza dentro de 30 segundos de mudanças em Sheets

## Suporte e Iteração

Após usar este sistema:
1. Teste com seus eventos de calendário reais
2. Verifique se AppSheet sincroniza corretamente
3. Confirme que fluxo de auditoria é natural
4. Reporte qualquer problema ou solicitação de feature

Melhorias comuns após primeiro uso:
- Adicionar campos customizados (departamento, categoria, etc.)
- Criar views adicionais no AppSheet
- Automatizar entrega de relatório por email
- Adicionar fluxo de aprovação
