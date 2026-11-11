#!/usr/bin/env bash
# Saytni Cloudflare Pages ga joylaydi (bitta buyruq).
# Birinchi marta: npx wrangler login
set -euo pipefail
cd "$(dirname "$0")"
bash build.sh
# --branch main — production (asosiy) manzilga joylash uchun
npx wrangler pages deploy dist --project-name mustaqil-ishlar --branch main
