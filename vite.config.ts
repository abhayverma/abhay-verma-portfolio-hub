import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
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
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // ← important: dev + build sourcemaps to map bundle lines to your source
    build: {
      sourcemap: true,
    },
  };
});
