import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/yudiz-task-management",
  resolve: {
    extensions: [".js", ".jsx"], // Add .jsx explicitly
  },
});
