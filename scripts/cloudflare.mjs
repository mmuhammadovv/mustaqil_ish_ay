// Cloudflare Pages bilan ishlash: loyiha ochish va joylash.
// Sayt nomi (URL) faqat bitta joyda — package.json → "cloudflare" → "project".
// Manzil: https://<project>.pages.dev
//
//   npm run create   — shu nom bilan Cloudflare'da loyiha ochadi (har yangi nom uchun bir marta)
//   npm run deploy   — saytni yigʻib, shu loyihaga joylaydi
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const project = pkg.cloudflare && pkg.cloudflare.project;

if (!project || !/^[a-z0-9][a-z0-9-]{0,56}[a-z0-9]$/.test(project)) {
  console.error(`Notoʻgʻri sayt nomi: "${project}". Faqat kichik lotin harflari, raqamlar va "-" (masalan: mening-oyinlarim).`);
  process.exit(1);
}

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

const action = process.argv[2];
if (action === "create") {
  run("npx", ["wrangler", "pages", "project", "create", project, "--production-branch", "main"]);
} else if (action === "deploy") {
  run("node", ["scripts/build.mjs"]);
  run("npx", ["wrangler", "pages", "deploy", "dist", "--project-name", project, "--branch", "main", "--commit-dirty=true"]);
  console.log(`\nSayt manzili: https://${project}.pages.dev`);
} else {
  console.log("Ishlatish: node scripts/cloudflare.mjs create | deploy");
}
