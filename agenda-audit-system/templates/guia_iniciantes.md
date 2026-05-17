# 📱 Sistema de Auditoria de Agenda - Guia Completo para Iniciantes

**Para pessoas que NUNCA usaram Google Sheets, Google Apps Script, ou AppSheet**

---

## 🎯 O que Você Vai Construir

Um **app mobile gratuito** que:
- ✅ Importa seus eventos de calendário automaticamente
- ✅ Permite marcar eventos como "auditado" ou "pendente"
- ✅ Mostra progresso (quantos auditados vs pendentes)
- ✅ Funciona em telefone, tablet e computador
- ✅ Compartilha com sua equipe
- ✅ Custa ZERO

**Tempo necessário**: 30-45 minutos (primeira vez)

---

## 📋 O que Você Precisa

- ✅ Conta Google (Gmail)
- ✅ Google Calendar (com alguns eventos)
- ✅ Conta AppSheet (gratuita, leva 2 minutos)
- ✅ Este guia

**É isso!** Sem cartão de crédito, sem programação, sem habilidades técnicas necessárias.

---

## 🚀 Vamos Começar!

### PASSO 1: Criar seu Google Sheets (5 minutos)

**O que é Google Sheets?**
É como Excel, mas online e gratuito. Seus dados vivem na nuvem.

**Como criar**:

1. Abra **Google.com** no seu navegador
2. No canto superior direito, clique nos **9 pontos** (menu Google Apps)
3. Clique em **Sheets** (ícone verde com grade)
4. Clique em **"+ Criar nova planilha"**
5. Clique em **"Planilha em branco"**
6. Uma nova planilha abre!

**Nomear sua planilha**:

1. No topo, você vê **"Planilha sem título"**
2. Clique nela
3. Digite: **"Auditoria de Agenda 2026"**
4. Pressione **Enter**
5. Pronto!

---

### PASSO 2: Criar Cabeçalhos de Coluna (5 minutos)

**O que são cabeçalhos?**
Cabeçalhos são os títulos das colunas que dizem qual dado vai em cada coluna.

**Como adicionar**:

1. Clique na célula **A1** (canto superior esquerdo)
2. Digite: **ID**
3. Pressione **Tab** (move para B1)
4. Digite: **Título**
5. Pressione **Tab** (move para C1)
6. Digite: **Início**
7. Pressione **Tab** (move para D1)
8. Digite: **Tipo**
9. Pressione **Tab** (move para E1)
10. Digite: **Auditado**
11. Pressione **Tab** (move para F1)
12. Digite: **Fim**
13. Pressione **Tab** (move para G1)
14. Digite: **Data Auditoria**
15. Pressione **Tab** (move para H1)
16. Digite: **Auditado Por**
17. Pressione **Enter**

**Deixar cabeçalhos bonitos (opcional)**:

1. Clique no **1** à esquerda (seleciona linha inteira 1)
2. Clique no botão **Negrito** (B)
3. Clique no ícone **balde de tinta** (cor de preenchimento)
4. Escolha **Azul**
5. Clique no **A** com cor (cor do texto)
6. Escolha **Branco**

**Seus cabeçalhos estão prontos!** ✅

---

### PASSO 3: Adicionar Google Apps Script (5 minutos)

**O que é Google Apps Script?**
É código que importa automaticamente seus eventos de calendário para Google Sheets.

**Como adicionar**:

1. No Google Sheets, clique em **Extensões** (menu superior)
2. Clique em **Apps Script**
3. Uma nova aba abre com editor de código
4. Você vê código padrão
5. Selecione **todo** o código (Ctrl+A ou Cmd+A)
6. **Delete** (pressione Delete)
7. Agora está vazio

**Cole o script completo**:

1. Copie o **código Google Apps Script completo** da Skill
2. Cole no editor vazio (Ctrl+V ou Cmd+V)
3. Clique em **Salvar** (Ctrl+S ou Cmd+S)
4. Um diálogo aparece pedindo nome do projeto
5. Clique em **OK** para aceitar nome padrão
6. Pronto!

---

### PASSO 4: Obter seu ID do Calendário (5 minutos)

**O que é ID do Calendário?**
É um código único que identifica SEU calendário. O script precisa disso para saber qual calendário importar.

**Como encontrar**:

1. Abra **Google Calendar** (calendar.google.com)
2. No lado esquerdo, encontre **"Meus calendários"**
3. Encontre nome do seu calendário (geralmente "Calendário")
4. Clique nos **3 pontos** ao lado dele
5. Clique em **"Configurações"**
6. Role para baixo até encontrar **"ID do calendário"**
7. Parece: `xxxxx@group.calendar.google.com`
8. Clique no ícone **copiar** (pequenos quadrados)
9. O ID agora está copiado para sua área de transferência

**Colocar o ID do Calendário no script**:

1. Volte para aba **Google Apps Script**
2. Procure linha 12: `CALENDAR_ID: "..."`
3. Selecione o texto entre as aspas (o ID antigo)
4. Delete
5. Cole seu ID do Calendário (Ctrl+V ou Cmd+V)
6. Clique em **Salvar** (Ctrl+S)

**Exemplo**:
```javascript
CALENDAR_ID: "seu_id_aqui@group.calendar.google.com",
```

---

### PASSO 5: Executar o Script (5 minutos)

**O que significa "executar"?**
Significa executar o código - dizer para começar a importar eventos.

**Como executar**:

1. No Google Apps Script, olhe para o topo
2. Você vê um dropdown que diz **"Selecione uma função"**
3. Clique nele
4. Escolha **"sincronizarAgendaTeste"**
5. Clique no botão **▶️ Play** (Executar)
6. Um popup aparece pedindo autorização
7. Clique em **"Revisar Permissões"**
8. Selecione sua conta Google
9. Clique em **"Permitir"** na parte inferior
10. Aguarde... o script está executando!
11. Quando terminar, você vê mensagem: **"✅ X eventos sincronizados com sucesso!"**

**Verificar se funcionou**:

1. Volte para aba Google Sheets
2. Você deve ver seus eventos de calendário na planilha!
3. Cada linha é um evento
4. Colunas mostram: Título, Hora início, Tipo, etc.

**Se nada aparecer**:
- Certifique-se de que tem eventos no Google Calendar
- Certifique-se de que as datas estão em 2026 (ou mude YEAR_START/YEAR_END no script)
- Tente executar o script novamente

---

### PASSO 6: Criar Conta AppSheet (3 minutos)

**O que é AppSheet?**
É uma ferramenta que transforma seu Google Sheets em um app mobile. Sem programação necessária!

**Como se cadastrar**:

1. Abra **appsheet.com**
2. Clique em **"Cadastre-se"** ou **"Comece Grátis"**
3. Clique em **"Cadastre-se com Google"**
4. Selecione sua conta Google
5. Clique em **"Permitir"** quando pedir permissões
6. Confirme seu email
7. Pronto! Você tem uma conta AppSheet

---

### PASSO 7: Conectar Google Sheets com AppSheet (5 minutos)

**Como criar seu app**:

1. No AppSheet, clique em **"+ Criar Novo App"**
2. Clique em **"Começar com dados"**
3. Clique em **"Google Sheets"**
4. Clique em **"Autorizar"** quando pedido
5. Selecione sua conta Google
6. AppSheet mostra seus Google Sheets
7. Encontre e clique em **"Auditoria de Agenda 2026"**
8. Clique em **"Selecionar"**
9. AppSheet analisa seus dados
10. Clique em **"Criar App"**
11. Seu app foi criado! 🎉

---

### PASSO 8: Criar 4 Views (10 minutos)

**O que são Views?**
Views são diferentes "telas" no seu app. Cada uma mostra dados diferentes.

**Criar View 1: ⏳ Pendentes (Pendentes)**

1. Clique em **"Editor"** (menu superior)
2. Clique em **"UX"** (barra lateral esquerda)
3. Clique em **"Views"**
4. Clique em **"+ Criar Nova View"**
5. Digite nome: **⏳ Pendentes**
6. Clique em **"Criar"**
7. Clique na nova view
8. Clique em **"Filtro"**
9. Adicione condição: `Auditado` = `FALSO`
10. Salve

**Criar View 2: ✅ Auditados (Auditados)**

Repita passos 1-10, mas:
- Nome: **✅ Auditados**
- Filtro: `Auditado` = `VERDADEIRO`

**Criar View 3: 📋 Todos (Todos)**

Repita passos 1-10, mas:
- Nome: **📋 Todos**
- Sem filtro (mostra tudo)

**Criar View 4: 📅 Hoje (Hoje)**

Repita passos 1-10, mas:
- Nome: **📅 Hoje**
- Filtro: `Início` >= HOJE() E `Início` < HOJE()+1

---

### PASSO 9: Testar seu App (5 minutos)

**Como testar**:

1. Clique em **"Preview"** (canto superior direito)
2. Seu app abre!
3. Você vê view **⏳ Pendentes** (todos os eventos não auditados)
4. Clique em um evento
5. Clique em **"Editar"**
6. Mude **"Auditado"** de FALSO para VERDADEIRO
7. Clique em **"Salvar"**
8. Volte para lista
9. Evento desapareceu de Pendentes!
10. Clique em view **✅ Auditados**
11. Evento aparece aqui!

**Parabéns!** Seu app funciona! 🎉

---

## 📱 Como Usar seu App

### Auditar um Evento

1. Abra app AppSheet
2. Vá para **⏳ Pendentes** (eventos pendentes)
3. Clique em um evento
4. Clique em **"Editar"**
5. Mude **"Auditado"** para **SIM**
6. Clique em **"Salvar"**
7. Evento automaticamente move para **✅ Auditados**

### Verificar Progresso

1. Vá para **📋 Todos** (todos os eventos)
2. Conte total de eventos
3. Vá para **✅ Auditados**
4. Conte eventos auditados
5. Calcule: (Auditados / Total) × 100 = % completo

### Compartilhar com Equipe

1. No AppSheet, clique em **"Configurações"** (ícone de engrenagem)
2. Clique em **"Compartilhamento"**
3. Digite emails dos membros da equipe
4. Clique em **"Convidar"**
5. Membros da equipe recebem email com link do app
6. Eles agora podem auditar eventos também!

### Ver Histórico de Auditoria

1. No Google Sheets, clique em **🔄 AGENDA** (menu)
2. Clique em **📋 Histórico de Auditoria**
3. Veja todas as ações com timestamps

### Gerar Relatório

1. No Google Sheets, clique em **🔄 AGENDA**
2. Clique em **📊 Relatório Completo**
3. Veja estatísticas:
   - Total de eventos
   - Contagem auditados
   - Contagem pendentes
   - % Conclusão

---

## 🔄 Mudando o Ano

**Quando começar um novo ano (2027, 2028, etc.)**:

1. Abra Google Apps Script
2. Encontre linhas 18-19:
   ```javascript
   YEAR_START: 2026,
   YEAR_END: 2026
   ```
3. Mude ambas para novo ano:
   ```javascript
   YEAR_START: 2027,
   YEAR_END: 2027
   ```
4. Salve (Ctrl+S)
5. Execute sincronização novamente

---

## ⚠️ Erros Comuns

| Erro | Solução |
|------|---------|
| "Nenhum evento importado" | Verifique se tem eventos no Google Calendar para 2026 |
| "ID do Calendário inválido" | Copie das configurações do Google Calendar, não manualmente |
| "AppSheet mostra nada" | Clique Atualizar no AppSheet, aguarde 30 segundos |
| "Linhas não ficam cinzas" | No Google Sheets, clique 🔄 AGENDA → 🎨 Reformatar Desmaiados |
| "Não consigo autorizar script" | Use janela incógnita, faça login com conta Google correta |

---

## 🎓 O que Você Aprendeu

✅ Criou Google Sheets  
✅ Adicionou Google Apps Script  
✅ Importou eventos de calendário  
✅ Criou app AppSheet  
✅ Construiu 4 views diferentes  
✅ Testou o app  
✅ Compartilhou com equipe  

**Você agora é especialista em Google Sheets + AppSheet!** 🚀

---

## 📞 Precisa de Ajuda?

1. Verifique o guia de **Solução de Problemas**
2. Releia o passo que está confuso
3. Tente novamente
4. Se ainda preso, peça ajuda nos comentários

---

## 🎉 Próximos Passos

1. **Use o app diariamente** para auditar eventos
2. **Convide membros da equipe** para colaborar
3. **Verifique relatórios semanalmente** para rastrear progresso
4. **Archive eventos antigos** quando ano terminar
5. **Customize views** conforme necessário

---

**Parabéns por completar a configuração!** 🎊

Seu sistema gratuito de auditoria de calendário sem código está pronto para usar.

Comece a auditar! 📅✅
