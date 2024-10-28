import { defineConfig } from "vite";
import handlebarsCompilePlugin from "./hbs-recompile.js";

/** @type {import('vite').UserConfig} */
export default defineConfig({
    base: "/xakaton-frontend/",
    plugins: [handlebarsCompilePlugin()],
    server: {
        host: "localhost",
        port: 5173,
    },
    preview: {
        host: "0.0.0.0",
        port: 5173,
    },
});
