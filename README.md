# 📚 Skills Reutilizáveis - Kaffa Zig Gestão

Repositório centralizado de Skills reutilizáveis para automação e integração de sistemas.

## 📋 Skills Disponíveis

### 🔄 Sistema de Auditoria de Agenda
**Pasta**: `agenda-audit-system/`

Sistema completo de auditoria de agenda usando Google Calendar, Google Sheets, Google Apps Script e AppSheet, totalmente gratuito e sem código.

**Características**:
- ✅ Sincronização automática com Google Calendar
- ✅ Rastreamento visual de status (auditado/pendente)
- ✅ Sincronização bidirecional com AppSheet
- ✅ Relatórios automáticos e histórico de auditoria
- ✅ 100% gratuito

**Como usar**:
1. Leia o arquivo `agenda-audit-system/SKILL.md`
2. Siga os 5 passos do Início Rápido
3. Sistema funcionando em 30 minutos

**Documentação**:
- `SKILL.md` - Guia principal
- `references/guia_configuracao_appsheet.md` - Configuração AppSheet
- `references/solucao_problemas.md` - Troubleshooting
- `templates/guia_iniciantes.md` - Guia para iniciantes

---

### 📊 Calculadora de ROI
**Pasta**: `roi-calculator/`

Aplicação web interativa para simular e calcular o Retorno sobre Investimento (ROI) em projetos de automação, processos e tecnologia. Desenvolvida em React 19 + TypeScript com cálculos financeiros precisos e fórmulas explícitas.

**Características**:
- ✅ Cálculos financeiros precisos (Payback, ROI, Economia Anual)
- ✅ Interface interativa com sliders
- ✅ Fórmulas explícitas em cada cálculo
- ✅ Design corporativo responsivo
- ✅ 100% em português brasileiro
- ✅ Pronto para produção

**Como usar**:
1. **Online**: https://roicalc-ct5tuckd.manus.space
2. **Local**: Clone e execute `pnpm dev`
3. Simule seus cenários de investimento

**Documentação**:
- `SKILL.md` - Guia principal
- `references/guia_uso_calculadora.md` - Como usar
- `references/guia_customizacao.md` - Como customizar
- `templates/exemplo_cenarios.md` - Exemplos de cenários

---

## 🚀 Como Usar as Skills

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/kaffazigservicos-mei/skills.git
   ```

2. **Escolha uma Skill**:
   ```bash
   cd skills/agenda-audit-system
   # ou
   cd skills/roi-calculator
   ```

3. **Leia o SKILL.md**:
   ```bash
   cat SKILL.md
   ```

4. **Siga as instruções**

---

## 📝 Estrutura de uma Skill

```
skill-name/
├── SKILL.md                 ← Arquivo principal
├── scripts/                 ← Código executável
│   └── complete_script.gs (ou código-fonte)
├── references/              ← Documentação detalhada
│   ├── guia_*.md
│   └── solucao_*.md
└── templates/               ← Guias para usuários
    └── exemplo_*.md
```

---

## 🤝 Contribuindo

Para adicionar uma nova Skill:

1. Crie pasta com nome da Skill
2. Siga a estrutura acima
3. Crie `SKILL.md` com documentação completa
4. Adicione referências e templates
5. Faça commit e push
6. Atualize este README

---

## 📞 Suporte

Para dúvidas sobre uma Skill, consulte:
- `SKILL.md` - Documentação principal
- `references/` - Guias detalhados
- `templates/` - Exemplos práticos

---

## 📊 Resumo de Skills

| Skill | Tipo | Status | Documentação |
|-------|------|--------|--------------|
| agenda-audit-system | Google Apps Script + AppSheet | ✅ Completa | 4 arquivos |
| roi-calculator | React 19 + TypeScript | ✅ Completa | 4 arquivos |

---

**Desenvolvido com ❤️ por Kaffa Zig Gestão**

Versão: 1.1  
Última atualização: 2026-05-18  
Total de Skills: 2
