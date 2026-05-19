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


Peço desculpas pelo equívoco. Compreendi perfeitamente o objetivo real e estratégico do sistema, bem como a correção sobre a finalidade da plataforma.

Aqui está a versão corrigida e alinhada do documento técnico para a pasta `sinconecta1`, estruturada com clareza e sobriedade para o ambiente corporativo.

---

# Sinconecta 1 — Skill Replicável

Este diretório contém a linha de base (*baseline*) e o instantâneo (*snapshot*) estrutural do projeto **Sinconecta 1**. Esta versão foi isolada e configurada como uma habilidade independente para que terceiros possam replicar, implantar e utilizar a solução de forma autônoma, sem interferir no fluxo de desenvolvimento ativo do aplicativo principal.

---

## 🎯 Objetivo do Aplicativo

O **Sinconecta 1** é uma plataforma de inteligência operacional que visa aproximar clientes que demandam serviços de eletricidade a técnicos especializados cadastrados no sistema. A solução promove a autonomia de mercado ao permitir que a negociação ocorra de forma direta entre o usuário final e o profissional prestador. A inteligência do sistema atua nos bastidores, realizando a compatibilização automática e precisa das demandas com base no tipo de serviço solicitado e no Código de Endereçamento Postal (CEP) de atendimento delimitado pelos técnicos.

---

## 🌐 Endereço de Acesso

A versão homologada e ativa desta solução de atendimento pode ser acessada e utilizada diretamente através do canal oficial do ecossistema:

> **Link Oficial:** `[https://github.com/kaffazigservicos-mei/sinconecta1](https://github.com/kaffazigservicos-mei/sinconecta1)`

---

## 🛠️ Pré-requisitos para Implantação

Antes de inicializar esta skill em seu ambiente local ou em um servidor de hospedagem, certifique-se de possuir instalado em sua estação de trabalho:

* **Node.js** (Versão LTS recomendada)
* Gerenciador de pacotes **npm** (nativo do Node) ou **Yarn**

---

## 📋 Passo a Passo para Configuração e Execução

Siga a sequência metodológica abaixo para implantar a aplicação de maneira isolada e segura:

1. **1. Obter os Ativos do Projeto:** Terminal.
Baixe ou clone o repositório central de competências para a sua máquina local e navegue especificamente para o diretório desta skill executando:
`cd sinconecta1`


2. **2. Isolar as Variáveis de Ambiente:** Editor de Código.
Localize o arquivo de modelo `.env.example` na raiz da pasta. Crie uma cópia exata deste arquivo no mesmo diretório e renomeie a cópia estritamente para **`.env`**.


3. **3. Parametrizar as Chaves de API:** Configuração.
Abra o novo arquivo `.env` criado e substitua os valores genéricos pelas suas credenciais privadas do banco de dados (Supabase) e chaves de comunicação do Telegram.


4. **4. Instalar as Dependências:** Gerenciador npm.
Execute o comando abaixo no seu console para baixar a árvore completa de módulos e pacotes requeridos pela aplicação:
`npm install`


5. **5. Inicializar o Ambiente de Testes:** Navegador Local.
Rode o servidor de desenvolvimento local para validar e interagir com o sistema em tempo real através do navegador:
`npm run dev`


---

## ⚙️ Arquitetura do Arquivo de Configuração (`.env`)

O funcionamento correto da skill depende do preenchimento rigoroso das seguintes variáveis de ambiente dentro do seu arquivo `.env` privado:

```env
# Conexão de Infraestrutura e Banco de Dados
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui

# Parâmetros de Notificação e Inteligência Operacional
VITE_TELEGRAM_BOT_TOKEN=seu_token_do_bot_aqui
VITE_TELEGRAM_CHAT_ID=seu_id_de_chat_ou_canal_aqui

# Controle de Ambiente
VITE_ENVIRONMENT=production

```

---

## 🔒 Governança de Código e Contribuições

Este repositório atua como uma biblioteca estática de distribuição pública. O desenvolvimento incremental e as atualizações de engenharia avançadas continuam sendo executados de forma contínua e dinâmica na plataforma Lovable. Caso deseje customizar o comportamento desta skill para o seu modelo de negócios, encorajamos a criação de uma ramificação (*branch*) própria ou o desenvolvimento de melhorias locais a partir deste marco regulatório.


# Finance Helper — Skill Replicável

Este diretório contém a linha de base (*baseline*) e o instantâneo (*snapshot*) estrutural do projeto **Finance Helper**. Esta versão foi isolada e configurada como uma habilidade independente para que terceiros possam replicar, implantar e utilizar o simulador financeiro de forma autônoma.

---

## 🎯 Objetivo do Aplicativo

O **Finance Helper** é um simulador financeiro dinâmico desenvolvido para auxiliar na modelagem, projeção e análise de cenários econômicos. A ferramenta processa dados inseridos pelo usuário em tempo real, fornecendo cálculos precisos e indicadores visuais para dar suporte à tomada de decisões estratégicas e ao planejamento financeiro de forma intuitiva e acessível.

---

## 🌐 Endereço de Acesso

A versão de produção homologada, ativa e pronta para uso deste simulador está hospedada publicamente através do link:

> **Link Oficial:** https://kaffazigservicos-mei.github.io/financehelper

---

## 🛠️ Pré-requisitos para Implantação

Antes de inicializar esta skill em seu ambiente local ou servidor, certifique-se de possuir instalado:

* **Node.js** (Versão LTS recomendada)
* Gerenciador de pacotes **npm** ou **Yarn**

---

## 📋 Passo a Passo para Configuração e Execução

Siga a sequência metodológica abaixo para implantar a aplicação de maneira isolada:

1. **Obter os Ativos:** Acesse o diretório desta skill no terminal: `cd financehelper`
2. **Isolar o Ambiente:** Duplique o arquivo `.env.example` e renomeie a cópia estritamente para `.env`.
3. **Parametrizar Chaves:** Abra o arquivo `.env` e insira as suas respectivas variáveis ou chaves de API, caso aplicável.
4. **Instalar Dependências:** Instale a árvore de pacotes requerida executando: `npm install`
5. **Inicializar a Solução:** Rode o servidor de desenvolvimento local com o comando: `npm run dev`

---

## 🔒 Governança de Código

Este diretório funciona como uma biblioteca estática para distribuição e replicação. O ambiente de produção ativo no GitHub Pages permanece isolado e protegido, garantindo a integridade operacional da solução principal de simulação.

# Analisador de Gastos — Skill Replicável

Este diretório contém o instantâneo (*snapshot*) estrutural do projeto **Analisador de Gastos**, configurado como uma habilidade independente para replicação e implantação autônoma.

---

## 🎯 Objetivo do Aplicativo

O **Analisador de Gastos** é uma solução de inteligência financeira projetada para realizar o mapeamento, categorização e auditoria de fluxos de saída de capital. O sistema processa os registros fornecidos pelo usuário, gerando relatórios consolidados e métricas visuais que facilitam a identificação de gargalos orçamentários, apoiando o planejamento estratégico e a otimização de recursos.

---

## 🌐 Endereço de Acesso

O fluxo de desenvolvimento ativo desta solução encontra-se centralizado no repositório de origem da organização:

> **Link Oficial:** https://github.com/kaffazigservicos-mei/analisador-de-gastos

---

## 📋 Passo a Passo para Configuração e Execução

1. **Obter os Ativos:** Acesse o diretório desta skill no seu terminal: `cd analisador-de-gastos`
2. **Isolar o Ambiente:** Duplique o arquivo `.env.example` na raiz e renomeie a cópia estritamente para `.env`.
3. **Instalar Dependências:** Execute a instalação dos pacotes rodando: `npm install`
4. **Inicializar a Solução:** Execute o servidor de desenvolvimento local com o comando: `npm run dev`

---

## 🔒 Governança de Código

Este diretório funciona estritamente como uma biblioteca estática para fins de distribuição e replicação pública, mantendo o repositório original protegido e isolado para novas implementações dinâmicas.


**Desenvolvido por Kaffa Zig Gestão**

