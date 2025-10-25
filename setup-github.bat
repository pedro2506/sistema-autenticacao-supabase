@echo off
echo ========================================
echo    CONFIGURACAO PARA GITHUB
echo ========================================
echo.

echo [1/4] Verificando se Git esta instalado...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Git nao encontrado!
    echo Por favor, instale o Git: https://git-scm.com/
    pause
    exit /b 1
)
echo ✓ Git encontrado!

echo.
echo [2/4] Inicializando repositorio Git...
if exist .git (
    echo ✓ Repositorio Git ja existe
) else (
    git init
    echo ✓ Repositorio Git inicializado
)

echo.
echo [3/4] Adicionando arquivos...
git add .
echo ✓ Arquivos adicionados

echo.
echo [4/4] Fazendo primeiro commit...
git commit -m "Initial commit: Sistema de autenticacao com Supabase"
echo ✓ Commit realizado

echo.
echo ========================================
echo    PROXIMOS PASSOS MANUAIS:
echo ========================================
echo.
echo 1. Acesse: https://github.com/new
echo 2. Crie um novo repositorio
echo 3. Execute os comandos que aparecem na tela
echo 4. Ou use o GitHub Desktop se preferir
echo.
echo Comandos tipicos:
echo   git remote add origin https://github.com/SEU-USUARIO/NOME-REPO.git
echo   git branch -M main
echo   git push -u origin main
echo.
echo ========================================
echo    ARQUIVOS CRIADOS:
echo ========================================
echo ✓ README.md - Documentacao completa
echo ✓ .gitignore - Arquivos ignorados
echo ✓ GITHUB_SETUP.md - Instrucoes detalhadas
echo.
echo Pressione qualquer tecla para continuar...
pause >nul
