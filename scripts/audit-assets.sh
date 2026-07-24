#!/bin/bash
# Verifica que todos los assets referenciados existan en public/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== RC1 Asset Audit ==="
MISSING=0

check_file() {
  local path="$1"
  if [ ! -f "public${path}" ]; then
    echo "MISSING: public${path}"
    MISSING=$((MISSING + 1))
  fi
}

# Extraer rutas /assets/ de config/data.ts
while IFS= read -r line; do
  check_file "$line"
done < <(grep -oE '"/assets/[^"]+"' config/data.ts | tr -d '"')

# Assets esenciales
for f in favicon.svg nexoweb-logo.svg nexoweb-logo-blanco.svg robots.txt; do
  check_file "/$f"
done

if [ "$MISSING" -eq 0 ]; then
  echo "✓ Todos los assets referenciados existen ($(find public/assets -type f | wc -l | tr -d ' ') en public/assets/)"
  exit 0
else
  echo "✗ $MISSING asset(s) faltantes"
  exit 1
fi
