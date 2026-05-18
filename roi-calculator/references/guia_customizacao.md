# Guia de Customização - Calculadora de ROI

## Como Customizar a Calculadora

### Customização 1: Mudar Cores

#### Passo 1: Abrir arquivo de estilos
```bash
# Abra em seu editor de código
client/src/index.css
```

#### Passo 2: Encontrar variáveis de cor
Procure pela seção `:root {`

```css
:root {
  --color-primary: #A4243B;      /* Vermelho - Economia */
  --color-secondary: #D4AF37;    /* Dourado - Acentos */
  --color-accent: #2563EB;       /* Azul - Valores */
  --color-success: #10B981;      /* Verde - ROI positivo */
  --color-warning: #EAB308;      /* Amarelo - Payback */
}
```

#### Passo 3: Modificar cores
Mude os códigos hex para suas cores:

```css
:root {
  --color-primary: #FF6B6B;      /* Seu vermelho */
  --color-secondary: #4ECDC4;    /* Seu azul */
  --color-accent: #45B7D1;       /* Seu azul claro */
  --color-success: #96CEB4;      /* Seu verde */
  --color-warning: #FFEAA7;      /* Seu amarelo */
}
```

#### Passo 4: Testar
```bash
pnpm dev
```
Abra http://localhost:3000 e veja as mudanças em tempo real!

---

### Customização 2: Mudar Ranges dos Sliders

#### Arquivo: `client/src/pages/Home.tsx`

**Encontre a seção de estado:**

```typescript
const [investmentAmount, setInvestmentAmount] = useState(50000);
const [reductionPercentage, setReductionPercentage] = useState(50);
const [hourlyRate, setHourlyRate] = useState(150);
const [weeklyHours, setWeeklyHours] = useState(20);
```

**Encontre os sliders:**

```jsx
<input
  type="range"
  min="10000"        {/* Mude aqui */}
  max="500000"       {/* E aqui */}
  value={investmentAmount}
  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
/>
```

**Exemplo: Mudar range de investimento para R$ 5.000 a R$ 1.000.000**

```jsx
<input
  type="range"
  min="5000"
  max="1000000"
  value={investmentAmount}
  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
/>
```

---

### Customização 3: Adicionar Novo Tipo de Investimento

#### Passo 1: Encontrar array de tipos

```typescript
const investmentTypes = [
  { id: 'automation', label: 'Automação', color: '#A4243B' },
  { id: 'process', label: 'Processo (TO BE)', color: '#2563EB' },
  { id: 'technology', label: 'Tecnologia', color: '#10B981' },
  { id: 'other', label: 'Outro', color: '#EAB308' },
];
```

#### Passo 2: Adicionar novo tipo

```typescript
const investmentTypes = [
  { id: 'automation', label: 'Automação', color: '#A4243B' },
  { id: 'process', label: 'Processo (TO BE)', color: '#2563EB' },
  { id: 'technology', label: 'Tecnologia', color: '#10B981' },
  { id: 'other', label: 'Outro', color: '#EAB308' },
  { id: 'infrastructure', label: 'Infraestrutura', color: '#FF6B6B' },  {/* Novo */}
];
```

#### Passo 3: Testar
```bash
pnpm dev
```
Novo tipo aparece como botão na interface!

---

### Customização 4: Mudar Fórmulas de Cálculo

#### Encontrar função de cálculo

```typescript
const calculateMetrics = () => {
  const hoursPerYear = weeklyHours * 52;
  const annualCost = hoursPerYear * hourlyRate;
  const annualSavings = annualCost * (reductionPercentage / 100);
  const economyPercentage = (annualSavings / annualCost) * 100;
  const paybackMonths = investmentAmount / (annualSavings / 12);
  const roi = ((annualSavings - investmentAmount) / investmentAmount) * 100;
  const hoursLiberated = hoursPerYear * (reductionPercentage / 100);

  return {
    hoursPerYear,
    annualCost,
    annualSavings,
    economyPercentage,
    paybackMonths,
    roi,
    hoursLiberated,
  };
};
```

#### Exemplo: Adicionar taxa de desconto ao ROI

**Antes:**
```typescript
const roi = ((annualSavings - investmentAmount) / investmentAmount) * 100;
```

**Depois (com 10% de desconto):**
```typescript
const discountRate = 0.10;
const roi = (((annualSavings * (1 - discountRate)) - investmentAmount) / investmentAmount) * 100;
```

#### Exemplo: Adicionar cálculo de VPL (Valor Presente Líquido)

```typescript
const calculateNPV = () => {
  const discountRate = 0.10; // 10% ao ano
  let npv = -investmentAmount; // Investimento inicial
  
  for (let year = 1; year <= 5; year++) {
    npv += annualSavings / Math.pow(1 + discountRate, year);
  }
  
  return npv;
};
```

---

### Customização 5: Mudar Textos e Labels

#### Encontrar textos na interface

```typescript
// Em Home.tsx, procure por:
<h1>Simuladora de ROI</h1>
<p>Tipo de Investimento</p>
<label>Montante do Investimento</label>
```

#### Mudar textos

```typescript
// Mude para:
<h1>Calculadora de Retorno - Minha Empresa</h1>
<p>Categoria do Projeto</p>
<label>Quanto você vai investir?</label>
```

---

### Customização 6: Adicionar Novo Card de Resultado

#### Passo 1: Adicionar cálculo

```typescript
const calculateMetrics = () => {
  // ... cálculos existentes ...
  
  // Novo cálculo: Tempo de recuperação em dias
  const paybackDays = paybackMonths * 30;
  
  return {
    // ... retornos existentes ...
    paybackDays,
  };
};
```

#### Passo 2: Adicionar card na interface

```jsx
<div className="bg-white rounded-lg border-l-4 border-yellow-400 p-6">
  <h3 className="text-sm font-semibold text-gray-600">Payback em Dias</h3>
  <p className="text-3xl font-bold text-yellow-600">{metrics.paybackDays.toFixed(0)}</p>
  <p className="text-xs text-gray-500 mt-2">
    Payback (dias) = Payback (meses) × 30
  </p>
</div>
```

---

### Customização 7: Integrar com Backend

#### Passo 1: Criar endpoint de API

```typescript
// server/index.ts
app.post('/api/simulations', (req, res) => {
  const simulation = req.body;
  // Salvar no banco de dados
  res.json({ id: 123, ...simulation });
});
```

#### Passo 2: Adicionar função de salvamento

```typescript
const saveSimulation = async () => {
  const data = {
    investmentAmount,
    reductionPercentage,
    hourlyRate,
    weeklyHours,
    metrics: calculateMetrics(),
  };
  
  const response = await fetch('/api/simulations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const result = await response.json();
  console.log('Simulação salva:', result);
};
```

#### Passo 3: Adicionar botão

```jsx
<button
  onClick={saveSimulation}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Salvar Simulação
</button>
```

---

### Customização 8: Adicionar Modo Comparativo

#### Passo 1: Adicionar estado para múltiplas simulações

```typescript
const [simulations, setSimulations] = useState([]);

const addSimulation = () => {
  setSimulations([
    ...simulations,
    {
      name: `Cenário ${simulations.length + 1}`,
      metrics: calculateMetrics(),
      params: { investmentAmount, reductionPercentage, hourlyRate, weeklyHours },
    },
  ]);
};
```

#### Passo 2: Exibir tabela comparativa

```jsx
<table className="w-full border-collapse border border-gray-300">
  <thead>
    <tr>
      <th>Cenário</th>
      <th>ROI</th>
      <th>Payback</th>
      <th>Economia</th>
    </tr>
  </thead>
  <tbody>
    {simulations.map((sim) => (
      <tr key={sim.name}>
        <td>{sim.name}</td>
        <td>{sim.metrics.roi.toFixed(1)}%</td>
        <td>{sim.metrics.paybackMonths.toFixed(1)} meses</td>
        <td>R$ {sim.metrics.annualSavings.toLocaleString('pt-BR')}</td>
      </tr>
    ))}
  </tbody>
</table>
```

---

### Customização 9: Adicionar Gráficos

#### Passo 1: Instalar biblioteca de gráficos

```bash
pnpm add recharts
```

#### Passo 2: Importar componentes

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
```

#### Passo 3: Criar dados para gráfico

```typescript
const generateChartData = () => {
  const data = [];
  for (let month = 0; month <= 24; month++) {
    data.push({
      month,
      cumulative: (annualSavings / 12) * month - investmentAmount,
    });
  }
  return data;
};
```

#### Passo 4: Renderizar gráfico

```jsx
<LineChart width={600} height={300} data={generateChartData()}>
  <CartesianGrid />
  <XAxis dataKey="month" label={{ value: 'Meses', position: 'insideBottomRight' }} />
  <YAxis label={{ value: 'R$', angle: -90 }} />
  <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
  <Line type="monotone" dataKey="cumulative" stroke="#A4243B" />
</LineChart>
```

---

### Customização 10: Adicionar Modo Escuro

#### Passo 1: Adicionar estado

```typescript
const [darkMode, setDarkMode] = useState(false);
```

#### Passo 2: Adicionar CSS para modo escuro

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
  }
}

body.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}
```

#### Passo 3: Adicionar botão de toggle

```jsx
<button
  onClick={() => setDarkMode(!darkMode)}
  className="p-2 rounded bg-gray-200 dark:bg-gray-800"
>
  {darkMode ? '☀️' : '🌙'}
</button>
```

---

## Dicas de Customização

### Dica 1: Teste Localmente
```bash
pnpm dev
```
Sempre teste mudanças localmente antes de fazer push!

### Dica 2: Use Git para Versionamento
```bash
git add .
git commit -m "Customize: Add new investment type"
git push
```

### Dica 3: Mantenha Documentação
Quando customizar, atualize comentários no código:
```typescript
// Customização: Adicionado em 2026-05-18
// Motivo: Suportar novo tipo de investimento
const investmentTypes = [...];
```

### Dica 4: Teste em Múltiplos Navegadores
- Chrome
- Firefox
- Safari
- Edge

### Dica 5: Valide Fórmulas
Quando mudar fórmulas, valide com especialista financeiro!

---

## Troubleshooting de Customização

### Problema: Mudanças não aparecem
**Solução**:
1. Salve o arquivo
2. Atualize o navegador (F5)
3. Limpe cache (Ctrl+Shift+Delete)
4. Reinicie servidor (`pnpm dev`)

### Problema: Erro de TypeScript
**Solução**:
1. Execute `pnpm check` para ver erros
2. Corrija os tipos
3. Teste novamente

### Problema: Estilos quebrados
**Solução**:
1. Verifique sintaxe CSS
2. Verifique classes Tailwind
3. Limpe cache do Tailwind

### Problema: Cálculos errados
**Solução**:
1. Verifique fórmula
2. Teste com valores conhecidos
3. Valide com calculadora

---

## Próximos Passos

1. **Customize cores** para sua marca
2. **Adicione novo tipo** de investimento
3. **Mude textos** para seu contexto
4. **Teste localmente** com `pnpm dev`
5. **Faça push** para GitHub
6. **Compartilhe** com sua equipe

---

**Aproveite a customização!** 🎨✅
