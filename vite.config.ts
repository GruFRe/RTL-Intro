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
	base: "/CI/",
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
		// added coverageand treshholds
		coverage: {
			provider: "istanbul", // Istanbul JS is a test coverage tool
			reporter: ["text", "json", "html"],
			thresholds: {
				branches: 80,
				functions: 80,
				statements: 80,
			},
		},
	},
});
