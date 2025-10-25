#!/bin/bash

echo "========================================"
echo "    CONFIGURAÇÃO PARA GITHUB"
echo "========================================"
echo

echo "[1/4] Verificando se Git está instalado..."
if ! command -v git &> /dev/null; then
    echo "ERRO: Git não encontrado!"
    echo "Por favor, instale o Git: https://git-scm.com/"
    exit 1
fi
echo "✓ Git encontrado!"

echo
echo "[2/4] Inicializando repositório Git..."
if [ -d ".git" ]; then
    echo "✓ Repositório Git já existe"
else
    git init
    echo "✓ Repositório Git inicializado"
fi

echo
echo "[3/4] Adicionando arquivos..."
git add .
echo "✓ Arquivos adicionados"

echo
echo "[4/4] Fazendo primeiro commit..."
git commit -m "Initial commit: Sistema de autenticação com Supabase"
echo "✓ Commit realizado"

echo
echo "========================================"
echo "    PRÓXIMOS PASSOS MANUAIS:"
echo "========================================"
echo
echo "1. Acesse: https://github.com/new"
echo "2. Crie um novo repositório"
echo "3. Execute os comandos que aparecem na tela"
echo "4. Ou use o GitHub Desktop se preferir"
echo
echo "Comandos típicos:"
echo "  git remote add origin https://github.com/SEU-USUARIO/NOME-REPO.git"
echo "  git branch -M main"
echo "  git push -u origin main"
echo
echo "========================================"
echo "    ARQUIVOS CRIADOS:"
echo "========================================"
echo "✓ README.md - Documentação completa"
echo "✓ .gitignore - Arquivos ignorados"
echo "✓ GITHUB_SETUP.md - Instruções detalhadas"
echo
echo "Pressione Enter para continuar..."
read
