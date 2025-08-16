import esbuild from "esbuild";
import { minify } from "terser";
import { execSync } from "child_process";
import fs from "fs";

const OUT_FILE = "dist/bundle.js";
const OUT_DIR = "dist";
const ZIP_FILE = "game.zip";

// 1. Compile with esbuild
await esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: OUT_FILE,
  minify: false,
  sourcemap: false,
  target: "es2020"
});

// 2. Minify with Terser
const code = fs.readFileSync(OUT_FILE, "utf8");
const minified = await minify(code, {
  compress: true,
  mangle: true,
  ecma: 2020
});
fs.writeFileSync(OUT_FILE, minified.code);

// 3. Create ZIP
execSync(`zip -9 -r ${ZIP_FILE} ${OUT_DIR} -x "*.DS_Store"`);

// 4. Extra compress with advzip (needs to be installed)
try {
  execSync(`advzip -z -4 ${ZIP_FILE}`);
} catch {
  console.warn("⚠ advzip not found, skipping extra compression");
}

// 5. Show file size
const stats = fs.statSync(ZIP_FILE);
console.log(`📦 ${ZIP_FILE} size: ${(stats.size / 1024).toFixed(2)} KB`);
