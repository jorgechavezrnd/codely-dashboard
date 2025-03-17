import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig((configEnv) => {
	const isDevelopment = configEnv.mode === "development";
	const env = loadEnv(configEnv.mode, process.cwd(), "");

	return {
		define: {
			"process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN": JSON.stringify(
				env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
			),
		},
		plugins: [react(), svgr()],
		css: {
			modules: {
				generateScopedName: isDevelopment ? "[name]__[local]__[hash:base64:5]" : "[hash:base64:5]",
			},
		},
	};
});
