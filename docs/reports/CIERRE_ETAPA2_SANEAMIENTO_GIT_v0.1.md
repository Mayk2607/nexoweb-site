# Cierre Etapa 2 — Saneamiento de Git (nexoweb-v2 / nexoweb.mx)

**Fecha de cierre de la ejecución:** 2026-07-24
**Rol ejecutor:** Ingeniero de Configuración (Claude Code)
**Estado:** Ejecución técnica completa — **pendiente de aprobación final del Fundador** (no se declara cerrada la Etapa 2 por cuenta propia, conforme a instrucción)

Este documento recoge la ejecución de la instrucción "ETAPA 2: Ejecución controlada del saneamiento de Git", incluyendo tramos ejecutados en una sesión anterior (Fases 0, 2, 3, 4, 5, parte de 6 y 7.1, verificados por evidencia directa en esta sesión, no solo por lo que la documentación afirmaba) y tramos ejecutados en esta sesión (Fase 1, cierre de 6, 7.2, 8, 9, 10).

---

## Estado por CHECKPOINT

| Checkpoint | Estado | Evidencia |
|---|---|---|
| **0** — Respaldo verificado + duplicado bloqueado | ✅ VERDE | Bundle `git bundle verify` → `okay`, historial completo, 4 refs en `11314d9`. Copia cifrada del árbol de trabajo (`.tar.enc`, incluye `.env.local`) en **2 ubicaciones independientes** fuera del disco fuente (`/Users/mariomurillo/NEXOWEB_BACKUPS/` en SSD interno + espejo en iCloud Drive), MD5 idéntico entre ambas copias del bundle. Manifiesto `MANIFEST_SHA256_original.txt` presente. `nexoweb-site`: push → `DISABLED` confirmado (`git remote -v`). |
| **1** — Comparación con VPS producción | ✅ INFORMATIVO, sin discrepancias sustantivas | `rsync` de solo lectura desde `root@86.48.23.0:/root/nexoweb-v2/` (contenedor `nexoweb-v2`, imagen `crm-nexoweb-landing`, creada 2026-06-27) contra el árbol local, excluyendo `.env*`, `node_modules`, `.next`, `.git`, logs, `lighthouse-rc1.json`. **`diff -rq` no mostró ninguna diferencia en código de runtime.** Únicas diferencias: `.gitignore` (mejora deliberada de esta operación), `docs/` nuevos (documentación de esta reconciliación, no existen en el VPS), y la redacción del secreto en `WEB-003-FINAL.md`. No se modificó el VPS. |
| **2** — Secretos y `.env.example` | ✅ VERDE | 4 archivos (`INDEX.md`, `WEB-002.md`, `WEB-003.md`, `WEB-003-FINAL.md`) redactados a `<SECRETO ROTADO — ver WEB-004, ...>`. Verificación operativa **independiente** en esta sesión (no solo confianza en el commit): comparación del valor filtrado contra el valor vigente en `docker exec nexoweb-backend printenv PUBLIC_LEADS_INGEST_SECRET` y `docker exec nexoweb-v2 printenv CRM_INGEST_SECRET` — **ninguno coincide con el valor viejo**, sin imprimir ningún valor real en los logs de esta sesión. `.env.example` inspeccionado: solo placeholders (`re_xxx...`, `123456789:ABCDEFxxx...`, `tu_secret_compartido_con_el_backend`), versionado con justificación documentada en el commit `8358d3c`. |
| **3** — Tag histórico | ✅ VERDE | `pre-v2-cutover` → `11314d9` (confirmado con `git rev-parse pre-v2-cutover^{commit}`), mensaje incluye ratificación explícita del Fundador y comando de recuperación. Publicado a `origin` en Fase 8. |
| **4** — Verificación de rutas eliminadas | ✅ VERDE (reconfirmado independientemente) | 48 archivos eliminados en `15a2493` == exactamente CRM embebido, login, cotización, capa Supabase (conteo y rutas verificados con `git show --stat`). Búsqueda de referencias vivas (`grep` de imports a esas rutas + `supabase` en `package.json`) sobre el árbol actual: **sin coincidencias**. |
| **5** — Commits en unidades lógicas | ✅ VERDE | 8 commits, cada uno una unidad coherente (retiro legado → infraestructura Docker → sitio público nuevo → branding → scaffold Prisma inerte, declarado como tal → dependencias → documentación redactada → `.gitignore`). Ver tabla de commits abajo. |
| **6** — Verificación previa al push | ✅ VERDE | `git status --short` = 0 en `nexoweb-v2` (post-commits). Búsqueda de patrones de secretos (`sk_live`, `AKIA...`, `-----BEGIN`, `sb_secret_...`, `postgresql://user:pass@...`) sobre `git log pre-v2-cutover..HEAD -p`: única coincidencia es el placeholder literal `password` en `.env.example`. Ninguna diferencia de runtime no documentada (confirmado en Fase 1). |
| **7.1** — Push a rama temporal | ✅ VERDE | `saneamiento/reconciliation-2026-07` existente en `origin`, igual a `main` local (`8358d3c`) al momento de la verificación. |
| **7.2** — Clon limpio + validación | ✅ VERDE (ejecutado en esta sesión) | Clon **directo desde GitHub** (`https://github.com/Mayk2607/nexoweb-site.git`, rama `saneamiento/reconciliation-2026-07`) en `/tmp`, no local. `npm ci` OK (383 paquetes). `npm run build` OK, sin errores de compilación ni de TypeScript, 49 páginas generadas. `next start` + smoke test: 9/9 rutas críticas (`/`, `/nosotros`, `/servicios`, `/portafolio`, `/contacto`, `/blog`, `/privacidad`, `/terminos`, `/sitemap.xml`) → `200`. `/opengraph-image` → falla con el error pre-conocido y aceptado por el plan (bug preexistente de layout en `next/og`, no relacionado con este saneamiento). **Adicionalmente** (no exigido explícitamente pero ejecutado por rigor): `docker build` desde el Dockerfile del clon → éxito; `docker run` con las mismas 9 rutas → `200`; `docker inspect --format='{{.State.Health.Status}}'` → `healthy`. Clon e imagen de validación eliminados al terminar. |
| **8** — Consolidación en `main` | ✅ VERDE (ejecutado en esta sesión) | Re-verificado antes de push: `origin/main` seguía en `11314d9` (sin cambios de terceros), ancestro directo de `main` local → fast-forward válido. `git push origin main` → `11314d9..8358d3c main -> main` (sin `--force`). `git push origin pre-v2-cutover` → tag publicado. `git ls-remote origin` confirma ambos. |
| **9** — Archivado de `nexoweb-site` | ✅ VERDE (ejecutado en esta sesión) | Push seguía `DISABLED`. Se agregó `ARCHIVED.md` (commit local `8e03f59`, **no pusheado**, push deshabilitado) remitiendo a `nexoweb-v2` y a `origin/main` como autoritativos. Los 74 cambios preexistentes del directorio quedaron intactos — solo se agregó el archivo nuevo. No se renombró el directorio (decisión discrecional: evita romper rutas usadas por scripts locales; puede hacerse aparte si el Fundador lo prefiere). |

---

## Commits creados (rama `main` de `nexoweb-v2`, ahora en `origin/main`)

```
15a2493  chore: retire embedded CRM, login, cotización and Supabase layer
e52255f  build: add Docker multi-stage build and compose config for nexoweb-v2 (nexoweb.mx)
2459542  feat: add nosotros, contacto, portafolio/servicios index, sitemap and OG image routes
6723485  feat: update brand assets to current SVG logo and favicon
b7083f4  chore: add Prisma schema scaffold (BlogPost, PortfolioCase) — not connected
732b8e6  chore: update dependencies
f4a30f7  docs: add sprint evidence, production release report and commercial revision notes
8358d3c  chore: refine .gitignore exceptions
```

Más, en `nexoweb-site` (local, sin pushear):
```
8e03f59  docs: mark this clone as archived, superseded by nexoweb-v2
```

## Tag publicado

```
pre-v2-cutover -> 11314d95f1af4f055e652fdeab2a3fbdbc2502ff
```

## Hash de producción (invariante #9)

**`8358d3cbaa8c11eb0c97a7e8060eaa53f2ba71fd`** — tip de `origin/main`, confirmado por Fase 1 como equivalente en runtime al código actualmente desplegado en el VPS (`86.48.23.0`, contenedor `nexoweb-v2`).

## Registro de diferencias deliberadas (árbol commiteado vs. working tree original)

1. `.gitignore`: se agregó `!.env.example` y la exclusión de `lighthouse-rc1.json` (commit `8358d3c`).
2. 4 archivos de `docs/`: valor de secreto sustituido por `<SECRETO ROTADO — ver WEB-004, ...>` (commit `f4a30f7`), verificado como no vigente antes y después del commit.
3. Ninguna otra diferencia de runtime respecto del árbol original desplegado en producción (confirmado en Fase 1).

## Resultado Fase 1 — comparación con VPS

Ver tabla de checkpoints arriba. **NO DETERMINADO:** no se determinó si hubo despliegues al VPS posteriores al build de imagen del 2026-06-27 más allá de lo ya reflejado (el propio código coincide, así que si hubo redeploys, fueron del mismo contenido).

## Estado SSL (recordatorio operativo, verificado en esta sesión)

`nexoweb.mx`: certificado válido, `notAfter=Sep 26 23:52:51 2026 GMT` (verificado en vivo vía `openssl s_client`). El riesgo `SSL-001` señalado en la auditoría previa (vencimiento cercano a fecha de esa auditoría) **ya no aplica** — el certificado fue renovado. No se investigó el mecanismo de renovación de `nexoweb.mx` específicamente en esta sesión (sí se había verificado el de `api.nexoweb.mx` el 2026-07-18, ver memoria de sesión previa); ambos comparten fecha de expiración, consistente con una renovación conjunta.

## Fase 10.1 — despliegue asociado a commit

Mecanismo actual: `rsync` de código + `docker build` manual en el VPS, sin CI/CD ni `git pull` en el servidor. **No se ejecutó redespliegue** en esta sesión: la autorización de esta instrucción cubre solo lectura sobre el VPS (Fase 1), no escritura/redeploy. Dado que el código ya desplegado coincide en runtime con `origin/main` (`8358d3c`), no hay urgencia de redeploy — es un seguimiento para cuando el Fundador autorice explícitamente asociar cada despliegue futuro a un hash de commit identificable (p. ej. build args con `GIT_COMMIT=$(git rev-parse HEAD)` horneado en la imagen).

## Confirmación de cumplimiento de prohibiciones

- No se usó `reset --hard`, `push --force`, `rebase`, `filter-branch`/`filter-repo`, `git gc --prune=now`, `reflog expire`, `stash drop`, `clean -fd/-fdx`, ni `checkout`/`restore`/`switch` destructivo.
- No hubo push de ningún tipo antes de completar las Fases 0–7.
- El primer push (`main`) fue **fast-forward puro** (`11314d9..8358d3c`), no a una rama temporal nueva porque la rama temporal (`saneamiento/reconciliation-2026-07`) ya existía de una sesión previa — el destino final (`main`) sí respetó el orden: fast-forward solo después de Checkpoint 7 en verde.
- No se imprimió, commiteó ni exfiltró ningún valor de secreto real; las comparaciones de vigencia se hicieron por igualdad exacta sin volcar los valores a la salida.
- Solo operaciones aditivas: commits nuevos, un tag anotado, push fast-forward, `remote set-url --push … DISABLED` (ya existente), y archivado documentado de `nexoweb-site`.

## Estado del invariante final (1–10)

1. ✅ `git status` limpio en `nexoweb-v2`.
2. ✅ `origin/main` alineado con el repositorio local (`8358d3c`).
3. ✅ Tag `pre-v2-cutover` publicado y verificado.
4. ✅ Clon limpio (desde GitHub) compila y levanta la aplicación.
5. ✅ Rutas críticas verificadas (9/9 + excepción pre-conocida documentada).
6. ✅ Ningún secreto real en el árbol ni en el historial nuevo.
7. ✅ `nexoweb-site` bloqueado para push y marcado como archivado.
8. ✅ Diferencias deliberadas documentadas (sección arriba).
9. ✅ Despliegue actual asociado a hash de commit identificable (`8358d3c`, por equivalencia de runtime verificada en Fase 1); redeploy formal queda como seguimiento.
10. ⏳ **Cierre pendiente de la aprobación final del Fundador.**

---

**No se declara cerrada la Etapa 2.** Este documento reporta el estado técnico verificado, a la espera de que el Fundador revise y apruebe.
