# Guia de Configuração AppSheet

## Instruções Completas de Configuração

### Pré-requisitos
- Conta AppSheet (gratuita em appsheet.com)
- Google Sheets "Auditoria de Agenda 2026" já criado
- Google Apps Script já instalado e configurado

### Passo 1: Criar Conta AppSheet

1. Vá para **appsheet.com**
2. Clique em **"Cadastre-se"** ou **"Comece Grátis"**
3. Use sua **conta Google** para se registrar
4. Confirme seu email
5. Pronto para criar seu primeiro app

### Passo 2: Conectar Google Sheets

1. No dashboard do AppSheet, clique em **"+ Criar Novo App"**
2. Clique em **"Começar com dados"**
3. Clique em **"Google Sheets"**
4. Clique em **"Autorizar"** quando solicitado
5. Selecione sua conta Google
6. Conceda ao AppSheet acesso aos seus Google Sheets

### Passo 3: Selecionar Fonte de Dados

1. AppSheet mostra seus Google Sheets
2. Encontre e clique em **"Auditoria de Agenda 2026"**
3. Clique em **"Selecionar"**
4. AppSheet analisa a estrutura da planilha

### Passo 4: Revisar App Auto-Gerado

AppSheet cria automaticamente:
- **Tabela**: "Página1" (seus dados principais)
- **Views**: Views padrão de lista e detalhe
- **Colunas**: Todas as 8 colunas da sua planilha
- **Tipos de dados**: Auto-detectados dos seus dados

### Passo 5: Customizar Views

#### Criar View: ⏳ Pendentes

1. Clique em **"Editor"** (menu superior)
2. Clique em **"UX"** (barra lateral esquerda)
3. Clique em **"Views"**
4. Clique em **"+ Criar Nova View"**
5. Digite nome: **⏳ Pendentes**
6. Selecione tipo de view: **Tabela**
7. Clique em **"Criar"**

**Configurar Filtro**:
1. Clique na nova view
2. Clique em **"Filtro"**
3. Adicione condição: `Auditado` = `FALSO`
4. Salve

#### Criar View: ✅ Auditados

1. Repita passos 1-7 acima
2. Digite nome: **✅ Auditados**
3. Adicione filtro: `Auditado` = `VERDADEIRO`

#### Criar View: 📋 Todos

1. Repita passos 1-7
2. Digite nome: **📋 Todos**
3. Sem filtro (mostra todos os eventos)

#### Criar View: 📅 Hoje

1. Repita passos 1-7
2. Digite nome: **📅 Hoje**
3. Adicione filtro: `Início` >= HOJE() E `Início` < HOJE()+1

### Passo 6: Testar o App

1. Clique em **"Preview"** (canto superior direito)
2. AppSheet abre seu app em modo preview
3. Teste cada view:
   - ⏳ Pendentes: Deve mostrar apenas eventos não auditados
   - ✅ Auditados: Deve mostrar apenas eventos auditados
   - 📋 Todos: Deve mostrar todos os eventos
   - 📅 Hoje: Deve mostrar eventos de hoje

### Passo 7: Auditar um Evento

1. Na view **⏳ Pendentes**
2. Clique em uma linha de evento
3. Clique em **"Editar"**
4. Mude **"Auditado"** de FALSO para VERDADEIRO
5. Clique em **"Salvar"**
6. Volte para a lista
7. Evento deve desaparecer de Pendentes
8. Verifique view ✅ Auditados - evento deve aparecer lá

### Passo 8: Compartilhar com Equipe

1. Clique em **"Configurações"** (ícone de engrenagem)
2. Clique em **"Compartilhamento"**
3. Digite emails dos membros da equipe
4. Defina permissões: **Editor** (pode editar) ou **Visualizador** (apenas leitura)
5. Envie convites

## Configuração Avançada

### Adicionar Colunas Customizadas

Para adicionar uma nova coluna (ex: "Departamento"):

1. No Google Sheets, adicione coluna I: "Departamento"
2. Adicione valores de exemplo
3. No AppSheet, clique em **"Atualizar"** (sincronizar com Sheets)
4. Coluna aparece automaticamente em todas as views

### Customizar Exibição de Colunas

1. No Editor do AppSheet → UX → Views
2. Clique em uma view
3. Clique em **"Colunas"**
4. Reordene colunas arrastando
5. Oculte colunas clicando no ícone de olho
6. Mude rótulos de colunas

### Adicionar Formatação Condicional

Para destacar linhas auditadas:

1. No Editor do AppSheet → UX → Views
2. Clique em uma view
3. Clique em **"Formatação Condicional"**
4. Adicione regra: Se `Auditado` = VERDADEIRO, aplique estilo (fundo cinza, texto itálico)

### Criar View de Resumo

Para mostrar estatísticas:

1. Crie nova view
2. Selecione tipo de view: **Dashboard**
3. Adicione cards:
   - Total de eventos: CONTAR(Página1)
   - Auditados: CONTAR(SELECIONAR(Página1, [Auditado]=VERDADEIRO))
   - Pendentes: CONTAR(SELECIONAR(Página1, [Auditado]=FALSO))
   - % Conclusão: (Auditados/Total)*100

## Solução de Problemas

### Problema: AppSheet mostra sem dados

**Solução**:
1. Verifique se Google Sheets tem dados (Página 1 com eventos)
2. No AppSheet, clique em **"Atualizar"** (ícone de sincronização)
3. Aguarde 30 segundos
4. Recarregue o app

### Problema: Mudanças não sincronizam de volta para Sheets

**Solução**:
1. AppSheet sincroniza automaticamente a cada 30 segundos
2. Verifique se você está em modo **Preview** (mudanças não salvam)
3. Saia do Preview e use o app **Publicado**
4. Sincronização manual: Clique no botão **"Sincronizar"** no app

### Problema: Filtro não está funcionando

**Solução**:
1. Verifique sintaxe do filtro: `Auditado` = `VERDADEIRO` (não "true" ou "TRUE")
2. Verifique se nome da coluna corresponde exatamente (sensível a maiúsculas)
3. Tente remover e recriar o filtro

### Problema: View não mostra todos os eventos

**Solução**:
1. Verifique se um filtro está aplicado (procure ícone de filtro)
2. Clique em **"Limpar Filtro"** se necessário
3. Verifique se Google Sheets tem os dados

## Limitações do Plano Gratuito

- **Máximo 10 linhas** por tabela (tier gratuito)
- **Máximo 5 usuários**
- **Acesso offline limitado**
- **Sem acesso à API**

**Para fazer upgrade**:
1. Clique em **"Configurações"** → **"Plano"**
2. Escolha plano pago
3. Linhas e usuários ilimitados

## Melhores Práticas

1. **Sincronização Regular**: Execute sincronização do Google Apps Script semanalmente
2. **Backup de Dados**: Exporte Google Sheets mensalmente
3. **Comunicação em Equipe**: Compartilhe link do app com a equipe
4. **Nomenclatura Consistente**: Use os mesmos nomes de coluna em Sheets e AppSheet
5. **Teste Primeiro**: Teste em Preview antes de compartilhar com a equipe

## Integração com Google Apps Script

AppSheet lê diretamente do Google Sheets (Página 1). Quando você:
- Executa sincronização no Google Apps Script → Novos eventos aparecem no AppSheet (dentro de 30 seg)
- Edita evento no AppSheet → Mudanças aparecem no Google Sheets (dentro de 30 seg)
- Adiciona coluna no Google Sheets → Nova coluna aparece no AppSheet (após Atualizar)

**Nota**: AppSheet NÃO executa diretamente funções do Google Apps Script. Use o menu no Google Sheets para executar sincronizações.
