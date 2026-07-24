#!/bin/bash
# Sincroniza assets estáticos de nexoweb-v2 al VPS (Nginx alias /assets/)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
ASSETS_DIR="$PROJECT_DIR/public/assets"

SSH_USER="${NDS_SSH_USER:-root}"
SSH_HOST="${NDS_SSH_HOST:-86.48.23.0}"
REMOTE_ASSETS="${NDS_ASSETS_REMOTE:-/var/www/nexoweb-assets}"

if [ ! -d "$ASSETS_DIR" ]; then
  echo "ERROR: No existe $ASSETS_DIR"
  exit 1
fi

echo "→ Sincronizando assets a $SSH_USER@$SSH_HOST:$REMOTE_ASSETS"
ssh "$SSH_USER@$SSH_HOST" "mkdir -p $REMOTE_ASSETS"
rsync -avz --delete "$ASSETS_DIR/" "$SSH_USER@$SSH_HOST:$REMOTE_ASSETS/"
echo "✓ Assets sincronizados ($(find "$ASSETS_DIR" -type f | wc -l | tr -d ' ') archivos)"
