# Windows PowerShell uchun: saytni Cloudflare Pages ga joylaydi.
# Birinchi marta: npx wrangler login
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
if (Test-Path dist) { Remove-Item -Recurse -Force dist }
New-Item -ItemType Directory dist | Out-Null
Copy-Item index.html, fan.html, _headers dist
Copy-Item -Recurse oyinlar, mustaqil-ishlar dist
npx wrangler pages deploy dist --project-name mustaqil-ishlar --branch main
