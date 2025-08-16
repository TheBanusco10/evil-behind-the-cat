import esbuild from "esbuild";
import livereload from "livereload";
import { spawn } from "child_process";

const OUT_DIR = "dist";
const PORT = 8080;

// 1. Start LiveReload server
const lrserver = livereload.createServer({
  exts: ["html", "js", "css"],
  delay: 100
});
lrserver.watch(OUT_DIR);

// 2. Start esbuild in watch mode
const ctx = await esbuild.context({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: `${OUT_DIR}/bundle.js`,
  minify: false,
  sourcemap: true,
  target: "es2020",
});

await ctx.watch();
console.log(`🛠 Watching for changes...`);

// 3. Serve dist folder with sirv
spawn("npx", ["sirv-cli", OUT_DIR, "--dev", "--port", PORT], {
  stdio: "inherit"
});

console.log(`🚀 Server running at http://localhost:${PORT}`);
