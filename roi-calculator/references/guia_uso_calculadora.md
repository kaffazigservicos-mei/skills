# Guia de Uso - Calculadora de ROI

## Como Usar a Calculadora

### Acesso Online (Mais Fácil)

1. Vá para: **https://roicalc-ct5tuckd.manus.space**
2. A calculadora abre no navegador
3. Comece a simular!

### Acesso Local (Para Desenvolvimento)

```bash
# 1. Clone o repositório
git clone https://github.com/kaffazigservicos-mei/skills.git
cd skills/roi-calculator

# 2. Instale dependências
pnpm install

# 3. Inicie servidor
pnpm dev

# 4. Abra no navegador
# http://localhost:3000
```

---

## Interface da Calculadora

### Seção 1: Seleção de Tipo de Investimento

**O que é?**
Escolha a categoria do seu investimento.

**Opções**:
- 🤖 **Automação**: Implementação de RPA, bots, automação de processos
- ⚙️ **Processo (TO BE)**: Redesenho e otimização de processos
- 💻 **Tecnologia**: Implementação de novas ferramentas e sistemas
- 📊 **Outro**: Investimentos diversos em operações

**Como usar**:
1. Clique em um dos botões
2. Cor muda para indicar seleção
3. Cálculos se atualizam automaticamente

---

### Seção 2: Controles Interativos (Sliders)

#### Slider 1: Montante do Investimento
- **Range**: R$ 10.000 a R$ 500.000
- **O que é?**: Quanto você vai investir
- **Como ajustar**: Arraste o slider ou clique nos botões +/-
- **Exemplo**: R$ 50.000

#### Slider 2: % Redução Esperada
- **Range**: 10% a 100%
- **O que é?**: Quanto você espera reduzir de custos
- **Como ajustar**: Arraste o slider
- **Exemplo**: 50% (reduz custos pela metade)

#### Slider 3: Valor da Hora
- **Range**: R$ 50 a R$ 500
- **O que é?**: Custo horário do trabalho manual
- **Como ajustar**: Arraste o slider
- **Exemplo**: R$ 150/hora

#### Slider 4: Horas Semanais
- **Range**: 5h a 40h
- **O que é?**: Quantas horas por semana em tarefas manuais
- **Como ajustar**: Arraste o slider
- **Exemplo**: 20h por semana

---

### Seção 3: Cards de Resultados

Cada card mostra:
1. **Métrica** (nome do cálculo)
2. **Valor** (resultado em destaque)
3. **Fórmula** (como foi calculado)

#### Card 1: Horas por Ano
```
Horas/Ano = Horas Semanais × 52 semanas comerciais
```
**Exemplo**: 20h × 52 = 1.040 horas/ano

#### Card 2: Custo Anual
```
Custo Anual = Horas/Ano × Valor da Hora
```
**Exemplo**: 1.040h × R$ 150 = R$ 156.000/ano

#### Card 3: Economia Anual
```
Economia Anual = Custo Anual × % Redução Esperada
```
**Exemplo**: R$ 156.000 × 50% = R$ 78.000/ano

#### Card 4: % de Economia Realizado
```
% Economia = (Economia Anual ÷ Custo Anual) × 100
```
**Exemplo**: (R$ 78.000 ÷ R$ 156.000) × 100 = 50%

#### Card 5: Horas Liberadas/Ano
```
Horas Liberadas = Horas/Ano × (% Redução ÷ 100)
```
**Exemplo**: 1.040h × 50% = 520 horas liberadas (13 semanas!)

#### Card 6: Payback Simples
```
Payback (meses) = Investimento ÷ (Economia Anual ÷ 12)
```
**Exemplo**: R$ 50.000 ÷ (R$ 78.000 ÷ 12) = 7,7 meses

#### Card 7: ROI Estimado
```
ROI (%) = ((Economia Anual - Investimento) ÷ Investimento) × 100
```
**Exemplo**: ((R$ 78.000 - R$ 50.000) ÷ R$ 50.000) × 100 = +56%

---

## Exemplos de Simulação

### Exemplo 1: Automação com Redução de 50%

| Parâmetro | Valor |
|-----------|-------|
| Tipo | Automação |
| Investimento | R$ 50.000 |
| Redução | 50% |
| Valor/Hora | R$ 150 |
| Horas/Semana | 20h |

**Resultados**:
| Métrica | Valor |
|---------|-------|
| Horas/Ano | 1.040h |
| Custo Anual | R$ 156.000 |
| Economia Anual | R$ 78.000 |
| Horas Liberadas | 520h (13 semanas) |
| Payback | 7,7 meses |
| ROI | +56% |

**Interpretação**:
- ✅ Investimento se paga em 7,7 meses
- ✅ Retorno de 56% no primeiro ano
- ✅ Libera 13 semanas de trabalho

---

### Exemplo 2: Processo com Redução de 30%

| Parâmetro | Valor |
|-----------|-------|
| Tipo | Processo (TO BE) |
| Investimento | R$ 30.000 |
| Redução | 30% |
| Valor/Hora | R$ 100 |
| Horas/Semana | 15h |

**Resultados**:
| Métrica | Valor |
|---------|-------|
| Horas/Ano | 780h |
| Custo Anual | R$ 78.000 |
| Economia Anual | R$ 23.400 |
| Horas Liberadas | 234h (6 semanas) |
| Payback | 15,4 meses |
| ROI | -22% |

**Interpretação**:
- ⚠️ Investimento leva 15,4 meses para se pagar
- ⚠️ ROI negativo no primeiro ano
- ✅ Mas libera 6 semanas de trabalho
- ✅ Viável em longo prazo (2+ anos)

---

### Exemplo 3: Tecnologia com Redução de 70%

| Parâmetro | Valor |
|-----------|-------|
| Tipo | Tecnologia |
| Investimento | R$ 100.000 |
| Redução | 70% |
| Valor/Hora | R$ 200 |
| Horas/Semana | 30h |

**Resultados**:
| Métrica | Valor |
|---------|-------|
| Horas/Ano | 1.560h |
| Custo Anual | R$ 312.000 |
| Economia Anual | R$ 218.400 |
| Horas Liberadas | 1.092h (27 semanas) |
| Payback | 5,5 meses |
| ROI | +118% |

**Interpretação**:
- ✅ Excelente investimento!
- ✅ Payback em 5,5 meses
- ✅ ROI de 118% no primeiro ano
- ✅ Libera 27 semanas (mais de 6 meses!)

---

## Dicas de Uso

### Dica 1: Teste Múltiplos Cenários
1. Simule cenário conservador (30% redução)
2. Simule cenário realista (50% redução)
3. Simule cenário otimista (70% redução)
4. Compare os resultados

### Dica 2: Use para Justificar Investimentos
1. Simule seu projeto
2. Imprima ou salve como PDF
3. Use em apresentação executiva
4. Mostre ROI e Payback

### Dica 3: Valide com Dados Reais
1. Obtenha dados reais de horas/semana
2. Obtenha valor real da hora (salário + encargos)
3. Valide % redução esperada com especialista
4. Simule com dados reais

### Dica 4: Considere Riscos
1. Redução esperada pode ser otimista
2. Implementação pode levar mais tempo
3. Custos podem ser maiores
4. Use cenário conservador para decisão

### Dica 5: Acompanhe Resultados
1. Após implementação, acompanhe resultados reais
2. Compare com simulação
3. Ajuste parâmetros para próximos projetos
4. Melhore precisão das estimativas

---

## Como Salvar Resultados

### Opção 1: Print do Navegador
1. Pressione **Ctrl+P** (ou **Cmd+P** no Mac)
2. Escolha **"Salvar como PDF"**
3. Nomeie o arquivo
4. Salve no seu computador

### Opção 2: Screenshot
1. Use ferramenta de screenshot do seu SO
2. Capture a tela da calculadora
3. Salve como imagem

### Opção 3: Copiar Valores
1. Selecione os valores manualmente
2. Copie (Ctrl+C)
3. Cole em Excel, Word, etc.

---

## Troubleshooting

### Problema: Calculadora não carrega
**Solução**:
1. Atualize a página (F5)
2. Limpe cache do navegador (Ctrl+Shift+Delete)
3. Tente em outro navegador

### Problema: Sliders não funcionam
**Solução**:
1. Atualize a página
2. Tente em outro navegador
3. Verifique conexão com internet

### Problema: Valores estão errados
**Solução**:
1. Verifique se os sliders estão nos valores corretos
2. Verifique se o tipo de investimento está selecionado
3. Leia as fórmulas nos cards para entender o cálculo

### Problema: Não consigo salvar como PDF
**Solução**:
1. Use navegador Chrome ou Firefox
2. Tente Print (Ctrl+P) em vez de salvar direto
3. Salve como imagem (screenshot) em vez de PDF

---

## Perguntas Frequentes

**P: Posso usar offline?**
R: Sim! Se clonar localmente e executar `pnpm dev`, funciona offline.

**P: Posso customizar as cores?**
R: Sim! Edite `client/src/index.css` e customize as cores.

**P: Posso adicionar novos tipos de investimento?**
R: Sim! Edite `client/src/pages/Home.tsx` e adicione novos tipos.

**P: Posso integrar com meu sistema?**
R: Sim! Copie o componente `Home.tsx` e adapte para seu projeto React.

**P: Os dados são salvos?**
R: Não, a calculadora não salva dados. Use localStorage ou backend para persistência.

**P: Posso usar em apresentações?**
R: Sim! Use print para PDF ou screenshot para imagem.

**P: Qual é a precisão dos cálculos?**
R: Os cálculos são precisos matematicamente, mas dependem da precisão dos dados de entrada.

**P: Posso usar para múltiplos projetos?**
R: Sim! Simule cada projeto separadamente e compare os resultados.

---

## Próximos Passos

1. **Simule seu primeiro cenário** - Use os dados do seu projeto
2. **Valide com especialista** - Confirme se os parâmetros estão corretos
3. **Teste múltiplos cenários** - Compare conservador vs otimista
4. **Use em apresentação** - Mostre ROI para stakeholders
5. **Acompanhe resultados** - Compare simulação vs realidade
6. **Melhore estimativas** - Use dados reais para próximos projetos

---

**Aproveite a Calculadora de ROI!** 📊✅
