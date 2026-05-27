#!/bin/bash
# Script de Replicação da Skill - sinconecta1

echo "=================================================="
echo "          REPLICAÇÃO DA SKILL SINCONECTA1         "
echo "=================================================="
echo ""
echo "Este script irá clonar a estrutura do sinconecta1 e"
echo "configurar uma nova instância independente para uso."
echo ""

# Solicitação de Autorização do Usuário
read -p "Você autoriza a execução e configuração deste script? (s/n): " AUTORIZADO

if [[ "$AUTORIZADO" != "s" && "$AUTORIZADO" != "S" ]]; then
    echo "Operação cancelada pelo usuário. A skill não foi replicada."
    exit 1
fi

echo ""
echo "✔ Autorização concedida. Ajustando permissões locais..."
# Garante a permissão de execução no próprio script durante o runtime
chmod +x "$0" 2>/dev/null

echo ""
echo "Digite o nome da nova pasta/diretório para o projeto:"
read NOVO_PROJETO

if [ -z "$NOVO_PROJETO" ]; then
    echo "Erro: O nome da pasta não pode ser vazio."
    exit 1
fi

# 1. Clona o repositório original
echo "Clonando repositório base..."
git clone https://github.com/kaffazigservicos-mei/sinconecta1.git "$NOVO_PROJETO"

if [ ! -d "$NOVO_PROJETO" ]; then
    echo "Erro ao clonar o repositório. Verifique sua conexão com a internet."
    exit 1
fi

cd "$NOVO_PROJETO"

# 2. Desvincula o repositório original para criar uma nova identidade limpa
rm -rf .git

# 3. Reinicializa como um novo repositório Git local
git init

# 4. Configura as variáveis de ambiente base
if [ -f ".env.example" ]; then
    cp .env.example .env
    echo "✔ Arquivo .env criado a partir do modelo (.env.example)."
else
    touch .env
    echo "⚠ Aviso: .env.example não encontrado. Um arquivo .env vazio foi criado."
fi

echo ""
echo "=================================================="
echo "         SKILL REPLICADA COM SUCESSO!            "
echo "=================================================="
echo " Próximos passos para ativação:"
echo " 1. Acesse a pasta: cd $NOVO_PROJETO"
echo " 2. Abra o arquivo .env e insira suas credenciais."
echo " 3. Vincule ao seu novo GitHub executando:"
echo "    git remote add origin <URL_DO_SEU_NOVO_REPOSITORIO>"
echo "=================================================="