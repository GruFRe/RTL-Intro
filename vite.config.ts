/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	base: "./",
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	plugins: [react(), tailwindcss()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/vitest.setup.ts"],
		// added coverage and treshholds
		coverage: {
			provider: "istanbul", // Istanbul JS is a test coverage tool
			reporter: ["text", "json", "html"],
			thresholds: {
				branches: 10,
				functions: 10,
				statements: 10,
			},
		},
	},
});
