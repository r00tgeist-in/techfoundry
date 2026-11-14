import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function spaRoutesPlugin(): Plugin {
  return {
    name: "spa-routes-fallback",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const indexPath = path.join(dist, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const indexContent = fs.readFileSync(indexPath, "utf-8");

      // Generate 404.html for static servers & GitHub Pages
      fs.writeFileSync(path.join(dist, "404.html"), indexContent);

      // Generate physical static route directories for direct URL access
      const routes = ["about", "projects", "contact"];
      for (const route of routes) {
        const dir = path.join(dist, route);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), indexContent);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), spaRoutesPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
