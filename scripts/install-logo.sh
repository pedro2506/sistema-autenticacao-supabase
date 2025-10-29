#!/usr/bin/env bash
set -e

if [ "$#" -lt 1 ]; then
  echo "Uso: $0 /caminho/para/sua/logo.png"
  echo "Exemplo: $0 ~/Downloads/codeforge.png"
  exit 1
fi

SRC_PATH="$1"
# local onde o script ficará: scripts/install-logo.sh
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST_DIR="$SCRIPT_DIR/../src/assets"
DEST_FILE="$DEST_DIR/codeforge-logo.png"

if [ ! -f "$SRC_PATH" ]; then
  echo "Arquivo fonte não encontrado: $SRC_PATH"
  exit 2
fi

mkdir -p "$DEST_DIR"
cp "$SRC_PATH" "$DEST_FILE"

echo "Logo copiada para: $DEST_FILE"
echo "Você pode abrir as páginas em src/pages/ (login, dashboard, profile) para verificar a alteração." 

echo "Dica: torne o script executável com: chmod +x $0"