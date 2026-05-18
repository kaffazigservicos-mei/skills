---
name: roi-calculator
description: Calculadora interativa de ROI (Retorno sobre Investimento) para simular cenários de investimento em automação, processos e tecnologia. Aplicação web React com cálculos financeiros precisos, fórmulas explícitas e interface responsiva. Perfeita para análise de viabilidade de projetos, justificativa de investimentos e planejamento orçamentário. 100% em português brasileiro.
---

# Calculadora de ROI - Simulador de Retorno sobre Investimento

## Visão Geral

A **Calculadora de ROI** é uma aplicação web interativa desenvolvida em **React 19 + TypeScript** que permite simular e calcular o **Retorno sobre Investimento (ROI)** em projetos de automação, processos e tecnologia. A ferramenta oferece **transparência total** exibindo as fórmulas de cálculo em tempo real, permitindo que gestores e analistas tomem decisões informadas sobre investimentos tecnológicos.

**Perfeita para**: Análise de viabilidade, justificativa de investimentos, planejamento orçamentário, simulação de cenários, apresentações executivas.

## Capacidades Principais

### 1. Cálculos Financeiros Precisos
- **Economia Anual**: Calcula a redução de custos com base no investimento
- **Payback Simples**: Determina em quantos meses o investimento se paga
- **ROI Estimado**: Retorno sobre investimento em percentual
- **Horas Liberadas/Ano**: Quantifica o tempo economizado em horas
- **Custo Anual**: Calcula o custo total de operação anual
- **% de Economia Realizado**: Percentual de redução de custos

### 2. Controles Interativos
- **Montante do Investimento**: R$ 10.000 a R$ 500.000 (ajustável)
- **% Redução Esperada**: 10% a 100% (impacto esperado)
- **Valor da Hora**: R$ 50 a R$ 500 (custo horário)
- **Horas Semanais**: 5h a 40h (volume de tarefas manuais)
- **Tipo de Investimento**: Automação, Processo, Tecnologia, Outro

### 3. Transparência Total
Cada métrica exibe a **fórmula de cálculo** em tempo real:
- Horas/Ano = Horas Semanais × 52 semanas comerciais
- Custo Anual = Horas/Ano × Valor da Hora
- Economia Anual = Custo Anual × % Redução Esperada
- Payback Simples = Investimento ÷ (Economia Anual ÷ 12 meses)
- ROI Estimado = ((Economia Anual - Investimento) ÷ Investimento) × 100

### 4. Interface Responsiva
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)
- Design corporativo com paleta de cores profissional

## Início Rápido

### Pré-requisitos
- Node.js 18+
- pnpm 10+ (ou npm/yarn)
- Navegador moderno

### Instalação em 3 Passos

**Passo 1: Clonar Repositório**
```bash
git clone https://github.com/kaffazigservicos-mei/skills.git
cd skills/roi-calculator
```

**Passo 2: Instalar Dependências**
```bash
pnpm install
```

**Passo 3: Iniciar Servidor**
```bash
pnpm dev
```

Aplicação abre em: `http://localhost:3000`

### Usar Aplicação Publicada
Acesse diretamente: https://roicalc-ct5tuckd.manus.space

## Árvore de Decisão de Fluxo de Trabalho

### Eu quero...

**...usar a calculadora online**
→ Acesse: https://roicalc-ct5tuckd.manus.space
→ Ajuste os sliders
→ Veja os cálculos em tempo real

**...executar localmente**
→ Clone o repositório
→ Execute `pnpm install && pnpm dev`
→ Abra http://localhost:3000

**...customizar as fórmulas**
→ Edite `client/src/pages/Home.tsx`
→ Modifique funções de cálculo
→ Execute `pnpm dev` para testar

**...mudar as cores e design**
→ Edite `client/src/index.css`
→ Modifique variáveis CSS
→ Ou customize Tailwind em `tailwind.config.js`

**...adicionar novos tipos de investimento**
→ Edite array `investmentTypes` em `Home.tsx`
→ Adicione novo tipo com descrição
→ Salve e teste

**...exportar resultados**
→ Use print do navegador (Ctrl+P)
→ Salve como PDF
→ Ou faça screenshot dos resultados

**...integrar com meu sistema**
→ Copie componente `Home.tsx`
→ Adapte para seu projeto React
→ Importe dependências necessárias

## Arquitetura Técnica

### Stack Tecnológico
```
Frontend:
├── React 19 - UI library
├── TypeScript - Type safety
├── Tailwind CSS 4 - Styling
├── Wouter - Client-side routing
└── shadcn/ui - Component library

Build & Deploy:
├── Vite - Build tool
├── Node.js - Runtime
└── Express - Static server
```

### Estrutura do Projeto
```
roi-calculator/
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── logo.png
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx          # Componente principal
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── contexts/             # React contexts
│   │   ├── lib/                  # Utilitários
│   │   ├── App.tsx               # Roteamento
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Estilos globais
│   └── index.html
├── server/
│   └── index.ts                  # Express server
├── package.json
└── README.md
```

### Componente Principal: Home.tsx
- **Gerencia estado** dos parâmetros (sliders)
- **Realiza cálculos** em tempo real
- **Exibe cards** com fórmulas explícitas
- **Formata valores** em português brasileiro
- **Renderiza gráficos** de impacto (opcional)

## Configuração

### Parâmetros Padrão
```javascript
// client/src/pages/Home.tsx
const [investmentAmount, setInvestmentAmount] = useState(50000);
const [reductionPercentage, setReductionPercentage] = useState(50);
const [hourlyRate, setHourlyRate] = useState(150);
const [weeklyHours, setWeeklyHours] = useState(20);
```

### Ranges de Valores
- **Investimento**: R$ 10.000 a R$ 500.000
- **Redução**: 10% a 100%
- **Valor/Hora**: R$ 50 a R$ 500
- **Horas/Semana**: 5h a 40h

### Paleta de Cores
| Cor | Código | Uso |
|-----|--------|-----|
| Vermelho | #A4243B | Economia, destaque |
| Dourado | #D4AF37 | Acentos, premium |
| Azul | #2563EB | Valores neutros |
| Amarelo | #EAB308 | Payback |
| Verde | #10B981 | ROI positivo |

## Tarefas Comuns

### Tarefa: Simular Cenário de Automação
1. Acesse https://roicalc-ct5tuckd.manus.space
2. Selecione "Automação" em Tipo de Investimento
3. Ajuste Investimento: R$ 50.000
4. Ajuste Redução: 50%
5. Ajuste Valor/Hora: R$ 150
6. Ajuste Horas/Semana: 20h
7. Veja resultados: ROI +56%, Payback 7,7 meses

### Tarefa: Comparar Múltiplos Cenários
1. Abra 2 abas do navegador
2. Aba 1: Cenário Conservador (30% redução)
3. Aba 2: Cenário Otimista (70% redução)
4. Compare resultados lado a lado
5. Anote os valores para apresentação

### Tarefa: Gerar Relatório PDF
1. Simule o cenário desejado
2. Pressione Ctrl+P (ou Cmd+P)
3. Escolha "Salvar como PDF"
4. Nomeie o arquivo
5. Salve no seu computador

### Tarefa: Customizar Cores
1. Abra `client/src/index.css`
2. Encontre seção `:root {`
3. Modifique variáveis CSS:
   ```css
   --color-primary: #A4243B;
   --color-secondary: #D4AF37;
   ```
4. Execute `pnpm dev`
5. Veja mudanças em tempo real

### Tarefa: Adicionar Novo Tipo de Investimento
1. Edite `client/src/pages/Home.tsx`
2. Encontre array `investmentTypes`
3. Adicione novo objeto:
   ```javascript
   { id: 'custom', label: 'Meu Tipo', color: '#FF6B6B' }
   ```
4. Salve e teste

## Solução de Problemas

| Problema | Solução |
|----------|---------|
| "Porta 3000 em uso" | Mude porta: `PORT=3001 pnpm dev` |
| "Módulos não encontrados" | Execute `pnpm install` novamente |
| "TypeScript errors" | Execute `pnpm check` para diagnosticar |
| "Sliders não funcionam" | Limpe cache: `rm -rf node_modules && pnpm install` |
| "Estilos não aparecem" | Verifique `client/src/index.css` |
| "Cálculos errados" | Verifique fórmulas em `Home.tsx` |

## Customização

### Mudar Fórmula de Cálculo
No arquivo `client/src/pages/Home.tsx`, encontre função `calculateMetrics()`:

```typescript
// Exemplo: Mudar cálculo de ROI
const roi = ((annualSavings - investmentAmount) / investmentAmount) * 100;
// Para: Incluir taxa de desconto
const roi = ((annualSavings * 0.9 - investmentAmount) / investmentAmount) * 100;
```

### Adicionar Novo Cálculo
1. Adicione estado: `const [newMetric, setNewMetric] = useState(0);`
2. Calcule em `calculateMetrics()`: `const newMetric = ...;`
3. Retorne no objeto: `{ ..., newMetric }`
4. Exiba em novo card

### Integrar com Backend
Para salvar simulações:
1. Crie API endpoint: `POST /api/simulations`
2. Adicione função:
   ```typescript
   const saveSimulation = async () => {
     await fetch('/api/simulations', {
       method: 'POST',
       body: JSON.stringify({ investmentAmount, reductionPercentage, ... })
     });
   };
   ```
3. Adicione botão "Salvar"

## Melhores Práticas

1. **Validar Entrada**: Sempre validar valores dos sliders
2. **Formatar Valores**: Usar `toLocaleString('pt-BR')` para moeda
3. **Fórmulas Explícitas**: Mostrar cálculo em cada card
4. **Responsividade**: Testar em mobile, tablet, desktop
5. **Acessibilidade**: Usar labels descritivos nos sliders
6. **Performance**: Cálculos em tempo real sem lag
7. **Documentação**: Manter fórmulas documentadas

## Recursos

Esta skill inclui:

### scripts/
- `Home.tsx` - Componente principal da calculadora
- `package.json` - Dependências do projeto

### references/
- `guia_uso_calculadora.md` - Como usar a aplicação
- `guia_customizacao.md` - Como customizar e estender
- `solucao_problemas.md` - Troubleshooting

### templates/
- `exemplo_integracao.md` - Como integrar em outro projeto
- `exemplo_cenarios.md` - Cenários de simulação pré-configurados

## Limitações e Notas

- **Cálculos no Cliente**: Todos os cálculos executam no navegador (sem API)
- **Sem Persistência**: Simulações não são salvas (use localStorage se necessário)
- **Sem Autenticação**: Aplicação pública, sem login necessário
- **Sem Banco de Dados**: Dados não são armazenados no servidor
- **Compatibilidade**: Funciona em navegadores modernos (Chrome, Firefox, Safari, Edge)

## Suporte e Iteração

Após usar esta Skill:
1. Teste com seus cenários reais
2. Valide se as fórmulas correspondem aos seus cálculos
3. Customize cores e tipos de investimento conforme necessário
4. Integre com seus sistemas se precisar

Melhorias comuns após primeiro uso:
- Adicionar modo comparativo (salvar múltiplos cenários)
- Criar análise de sensibilidade
- Gerar relatórios em PDF
- Adicionar modo escuro
- Integrar com APIs de dados
- Adicionar histórico de simulações
