import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import requireTransform from "vite-plugin-require-transform";

const development = process.env.NODE_ENV === "development";

const extensions = [
	".web.tsx",
	".tsx",
	".web.ts",
	".ts",
	".web.jsx",
	".jsx",
	".web.js",
	".js",
	".json",
	".mjs",
];

export default defineConfig({
	plugins: [
		requireTransform({ fileRegex: /.ts$|.tsx$/ }),
		react({
			babel: {
				configFile: "./babel.config.cjs",
			},
		}),
	],
	define: {
		global: "window",
		__DEV__: JSON.stringify(development),
		DEV: JSON.stringify(development),
		"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
	},
	resolve: {
		extensions,
		alias: [
			{
				find: /react-native\/Libraries\/Image\/AssetRegistry/,
				replacement: resolve(
					__dirname,
					"node_modules/react-native-web/dist/modules/AssetRegistry"
				),
			},
			{ find: "react-native", replacement: "react-native-web" },
			{ find: /^(.*)\.png$/, replacement: "$1@3x.png" },
		],
	},
	optimizeDeps: {
		esbuildOptions: {
			resolveExtensions: extensions,
			loader: { ".js": "jsx" },
		},
	},
});
