import { defineConfig } from "vitest/config";
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  test: { include: ["tests/unit/**/*.test.ts"], environment: "node" },
  build: { chunkSizeWarningLimit: 1200 },
});
