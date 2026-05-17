# Solução de Problemas e FAQ

## Problemas Comuns e Soluções

### Problemas do Google Apps Script

#### "ID do Calendário inválido"

**Erro**: `Erro: ID do Calendário não encontrado`

**Causas**:
- ID do Calendário copiado errado
- ID do Calendário tem espaços extras
- Calendário não existe ou foi deletado

**Soluções**:
1. Vá para **Google Calendar** → Configurações
2. Encontre seu calendário na barra lateral esquerda
3. Clique em **3 pontos** → **Configurações**
4. Role até **"ID do calendário"**
5. Clique no botão **Copiar** (não copie manualmente)
6. Cole no Apps Script linha 12: `CALENDAR_ID: "..."`
7. Salve e tente novamente

---

#### "Nenhum evento importado"

**Sintomas**: Script executa mas Google Sheets permanece vazio

**Causas**:
- Sem eventos no Google Calendar para o ano selecionado
- Intervalo de ano está errado (2026 mas calendário tem eventos 2025)
- ID do Calendário está correto mas calendário está vazio

**Soluções**:
1. Verifique se Google Calendar tem eventos
2. Verifique se datas dos eventos estão dentro do intervalo de ano:
   - Abra Google Apps Script
   - Verifique linhas 18-19: `YEAR_START` e `YEAR_END`
   - Certifique-se de que correspondem ao ano do seu calendário
3. Crie evento de teste no Google Calendar
4. Execute sincronização novamente

---

#### "Erro de autorização do script"

**Erro**: `Autorização necessária` ou diálogo de permissão

**Causas**:
- Primeira vez executando o script
- Permissões mudaram
- Sessão expirou

**Soluções**:
1. Clique em **"Revisar Permissões"** no diálogo
2. Selecione sua conta Google
3. Clique em **"Permitir"** na parte inferior
4. Script continua automaticamente
5. Se ainda falhar, limpe cache do navegador e tente novamente

---

#### "Linhas não ficam cinzas (não desmaiam)"

**Sintomas**: Linhas auditadas permanecem brancas em vez de ficar cinzas

**Causas**:
- Formatação não aplicada
- Coluna E (Auditado) tem valores errados
- Formato foi limpo

**Soluções**:
1. No Google Sheets, clique em **🔄 AGENDA**
2. Clique em **🎨 Reformatar Desmaiados**
3. Aguarde conclusão
4. Linhas devem ficar cinzas automaticamente

---

#### "Coluna de status faltando"

**Sintomas**: Coluna I não mostra "✓ AUDITADO" ou "⏳ PENDENTE"

**Causas**:
- Coluna não foi criada ainda
- Coluna criada mas não preenchida
- AppSheet não sincronizado

**Soluções**:
1. No Google Sheets, clique em **🔄 AGENDA**
2. Clique em **🎨 Adicionar Coluna Status**
3. Aguarde conclusão
4. Coluna I deve ter valores de status agora
5. No AppSheet, clique em **Atualizar** para sincronizar

---

### Problemas do Google Sheets

#### "Cabeçalhos de coluna faltando"

**Sintomas**: Primeira linha está vazia ou tem cabeçalhos errados

**Causas**:
- Cabeçalhos foram deletados
- Dados foram colados sem cabeçalhos
- Script não executou corretamente

**Soluções**:
1. Verifique se linha 1 tem: ID, Título, Início, Tipo, Auditado, Fim, Data Auditoria, Auditado Por
2. Se faltando, adicione manualmente
3. Execute sincronização novamente de **🔄 AGENDA → 📥 Sincronizar com Calendário**

---

#### "Dados em colunas erradas"

**Sintomas**: Títulos de eventos na coluna A, datas na coluna B, etc.

**Causas**:
- Cabeçalhos não configurados corretamente
- Dados colados na posição errada
- Script executou mas colunas foram movidas

**Soluções**:
1. Delete todos os dados (mantenha cabeçalhos)
2. Certifique-se de que cabeçalhos estão na linha 1, colunas A-H
3. Execute sincronização novamente

---

#### "Aba Histórico não foi criada"

**Sintomas**: Nenhuma aba "Histórico" aparece

**Causas**:
- Aba Histórico criada mas oculta
- Script ainda não executou (cria na primeira execução)
- Aba foi deletada

**Soluções**:
1. Execute qualquer função do menu **🔄 AGENDA**
2. Aba Histórico auto-cria na primeira ação
3. Se ainda faltando, crie manualmente aba nomeada "Histórico"

---

### Problemas do AppSheet

#### "AppSheet mostra sem dados"

**Sintomas**: App AppSheet está vazio ou diz "Sem registros"

**Causas**:
- Google Sheets não conectado
- Página 1 está vazia
- AppSheet ainda não sincronizou
- Planilha errada selecionada

**Soluções**:
1. Verifique se Google Sheets tem dados:
   - Vá para sheets.google.com
   - Abra "Auditoria de Agenda 2026"
   - Verifique se Página 1 tem eventos
2. No AppSheet, clique em **Atualizar** (ícone de sincronização)
3. Aguarde 30 segundos
4. Recarregue app no navegador
5. Se ainda vazio, reconecte fonte de dados:
   - AppSheet Editor → Dados
   - Clique em "Página1"
   - Clique em "Atualizar"

---

#### "Mudanças não salvam"

**Sintomas**: Edita evento no AppSheet mas mudanças não aparecem em Sheets

**Causas**:
- Em modo Preview (mudanças não salvam)
- Sincronização desabilitada
- Conexão quebrada
- Modo offline

**Soluções**:
1. Saia do modo **Preview**
2. Use a versão do app **Publicada**
3. Verifique conexão com internet
4. Aguarde 30 segundos para sincronização
5. Atualize manualmente Google Sheets

---

#### "Filtro não está funcionando"

**Sintomas**: View mostra todos os eventos em vez de filtrados

**Causas**:
- Sintaxe do filtro errada
- Nome da coluna não corresponde
- Filtro foi limpo acidentalmente

**Soluções**:
1. Edite a view
2. Verifique condição do filtro:
   - Pendentes: `Auditado` = `FALSO`
   - Auditados: `Auditado` = `VERDADEIRO`
   - Hoje: `Início` >= HOJE() E `Início` < HOJE()+1
3. Verifique se nome da coluna corresponde exatamente
4. Salve e teste

---

#### "View não está aparecendo"

**Sintomas**: Criou view mas ela não aparece no app

**Causas**:
- View não publicada
- View oculta em configurações
- App não recarregado

**Soluções**:
1. No Editor do AppSheet → UX → Views
2. Verifique se view está visível (ícone de olho)
3. Verifique se view está publicada (marca de seleção verde)
4. Clique em **Preview** para recarregar app

---

### Problemas de Sincronização

#### "AppSheet e Sheets fora de sincronização"

**Sintomas**: Dados diferentes no AppSheet vs Google Sheets

**Causas**:
- Atraso de sincronização (normal, até 30 segundos)
- Edições manuais em Sheets não sincronizadas
- AppSheet em modo offline

**Soluções**:
1. Aguarde 30 segundos
2. No AppSheet, clique em **Atualizar**
3. No Google Sheets, pressione **F5** para recarregar
4. Verifique conexão com internet
5. Verifique se ambos estão editando a mesma planilha (Página 1)

---

#### "Eventos duplicados aparecendo"

**Sintomas**: Mesmo evento aparece múltiplas vezes

**Causas**:
- Sincronização executou múltiplas vezes
- Cópia-cola manual de dados
- Calendário tem eventos duplicados

**Soluções**:
1. Delete linhas duplicadas no Google Sheets
2. Execute **🔄 AGENDA → 🗑️ Limpar Dados** para limpar tudo
3. Execute sincronização novamente de **📥 Sincronizar com Calendário**

---

## Problemas de Performance

### "Script executa lentamente"

**Causas**:
- Grande número de eventos (1000+)
- Conexão de rede lenta
- Limites de cota do Google Apps Script

**Soluções**:
1. Limite intervalo de ano apenas ao ano atual
2. Archive dados antigos em planilha separada
3. Execute sincronização em horários de baixa atividade
4. Divida dados em múltiplos calendários

---

### "AppSheet carrega lentamente"

**Causas**:
- Muitas linhas (limite de plano gratuito é 10)
- Tamanho de arquivo grande
- Conexão de rede lenta

**Soluções**:
1. Faça upgrade do plano AppSheet para mais linhas
2. Archive eventos antigos
3. Verifique velocidade da internet
4. Use app mobile em vez de web

---

## Problemas de Dados

### "Ano errado aparecendo"

**Sintomas**: Importando eventos do ano errado

**Causas**:
- Configuração de ano errada
- Calendário tem eventos de múltiplos anos

**Soluções**:
1. Abra Google Apps Script
2. Encontre linhas 18-19:
   ```javascript
   YEAR_START: 2026,
   YEAR_END: 2026
   ```
3. Mude para ano correto
4. Salve e execute sincronização novamente

---

### "Datas formatadas errado"

**Sintomas**: Datas mostram como números (44000) em vez de datas

**Causas**:
- Formato de coluna não definido como data
- Dados colados como texto

**Soluções**:
1. Selecione coluna C (Início) e F (Fim)
2. Clique direito → Formatar células
3. Selecione formato **Data**
4. Escolha formato: **dd/mm/yyyy hh:mm**
5. Clique em Aplicar

---

### "Informação de auditoria faltando"

**Sintomas**: Colunas "Data Auditoria" e "Auditado Por" vazias

**Causas**:
- Auditoria ainda não registrada
- Script não atualizando colunas
- Entrada manual necessária

**Soluções**:
1. Ao marcar evento como auditado no AppSheet, colunas auto-preenchem
2. Se manual, digite:
   - Data Auditoria: Data de hoje
   - Auditado Por: Seu email
3. Execute **🔄 AGENDA → 🔄 Sincronizar com AppSheet** para atualizar

---

## Problemas de Conta e Acesso

### "Não consigo autorizar Google Apps Script"

**Erro**: `Falha na autorização` ou `Conta não reconhecida`

**Causas**:
- Usando conta Google errada
- Permissões da conta restritas
- Cookies do navegador limpos

**Soluções**:
1. Saia de todas as contas Google
2. Faça login com a conta que possui o calendário
3. Tente novamente
4. Se ainda falhar, use janela incógnita

---

### "AppSheet não conecta com Google Sheets"

**Causas**:
- AppSheet não autorizado
- Permissões da conta Google mudaram
- Configurações de compartilhamento da planilha erradas

**Soluções**:
1. No AppSheet, clique em **Configurações** → **Conexões**
2. Clique em **Google Sheets** → **Reconectar**
3. Autorize AppSheet novamente
4. Certifique-se de que Google Sheets está compartilhado com sua conta AppSheet

---

### "Membro da equipe não consegue acessar app"

**Causas**:
- Não convidado para o app AppSheet
- Permissões de compartilhamento não definidas
- Email errado

**Soluções**:
1. No AppSheet, clique em **Configurações** → **Compartilhamento**
2. Adicione email do membro da equipe
3. Defina permissão: **Editor** ou **Visualizador**
4. Envie link de convite
5. Membro da equipe deve aceitar convite

---

## Reset e Recuperação

### "Tudo quebrou, quero começar do zero"

**Passos**:
1. **Backup de dados**: Baixe Google Sheets como CSV
2. **Delete app AppSheet**: Dashboard AppSheet → Deletar app
3. **Limpe Google Sheets**: Delete todas as linhas exceto cabeçalhos
4. **Limpe Google Apps Script**: Delete código antigo, cole novo
5. **Comece do zero**: Siga guia Início Rápido novamente

---

### "Deletei acidentalmente dados importantes"

**Recuperação**:
1. Google Sheets tem **histórico de versão**:
   - Clique em **Arquivo** → **Histórico de versões** → **Ver todas as versões**
   - Encontre versão antes da deleção
   - Clique em **Restaurar esta versão**
2. AppSheet não tem recuperação (dados sincronizam de Sheets)
3. Se Sheets deletado, verifique lixeira do Google Drive

---

## Obtendo Ajuda

### Antes de contatar suporte:

1. ✅ Verifique este guia de solução de problemas
2. ✅ Verifique se todos os passos de configuração foram completados
3. ✅ Verifique se Google Sheets tem dados
4. ✅ Verifique se ID do Calendário está correto
5. ✅ Tente reiniciar navegador
6. ✅ Tente janela incógnita/privada
7. ✅ Verifique conexão com internet

### Informações para fornecer:

- O que você estava tentando fazer?
- Qual mensagem de erro apareceu?
- O que você já tentou?
- Screenshots do problema
- Nome e URL do Google Sheets
- Nome do app AppSheet

---

## FAQ

**P: Este sistema é gratuito?**
R: Sim! Google Sheets, Google Apps Script, e tier gratuito do AppSheet são todos gratuitos. Faça upgrade do AppSheet se precisar de mais de 10 linhas.

**P: Múltiplas pessoas podem usar?**
R: Sim! Compartilhe o app AppSheet com membros da equipe. Eles podem auditar eventos simultaneamente.

**P: Funciona offline?**
R: Parcialmente. AppSheet tem modo offline, mas sincronização requer internet.

**P: Posso usar meu próprio calendário?**
R: Sim! Apenas atualize o ID do Calendário no Google Apps Script.

**P: E se eu tiver 1000+ eventos?**
R: Considere arquivar eventos antigos ou dividir em múltiplos calendários.

**P: Posso exportar os dados?**
R: Sim! Baixe Google Sheets como CSV, Excel, ou PDF.

**P: Com que frequência sincroniza?**
R: AppSheet sincroniza a cada 30 segundos. Google Apps Script sincroniza quando você clica no menu.

**P: E se eu mudar o ano?**
R: Atualize YEAR_START e YEAR_END no Google Apps Script, depois execute sincronização novamente.

**P: Posso adicionar colunas customizadas?**
R: Sim! Adicione coluna ao Google Sheets, depois atualize AppSheet.

**P: Meus dados são seguros?**
R: Dados permanecem em sua conta Google. Apenas você e membros convidados podem acessar.

**P: Posso deletar eventos?**
R: Sim, delete linhas no Google Sheets ou use "Limpar Dados" para limpar tudo.
