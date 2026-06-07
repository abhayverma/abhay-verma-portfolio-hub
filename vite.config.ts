import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Uses native OXC compilers internally under Vite 8
import path from "node:path";
import { componentTagger } from "lovable-tagger";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const enableTagger = mode === "development" && process.env.ENABLE_TAGGER !== "false";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      enableTagger && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    build: {
      sourcemap: true,
    },
  };
});