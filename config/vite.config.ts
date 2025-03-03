import type { ConfigEnv, UserConfigExport } from "vite";
import { defineConfig } from "vite";
import camelCase from "lodash.camelcase";
import upperFirst from "lodash.upperfirst";
import react from "@vitejs/plugin-react";
import md5 from "md5";
import { checker } from "vite-plugin-checker";
import path from "path";
import fs from "fs";
import postcssNesting from "postcss-nesting";

const getNodeEnv = (mode: string) => {
  switch (mode) {
    case "development":
      return mode;
    case "production":
      return mode;
    default:
      return "production";
  }
};

const getDefine = (env: ConfigEnv) => {
  if (env.mode === "development") {
    return {
      global: {},
      "import.meta.env.VITE_APP_VERSION": `"${getAppVersion()}-DEV"`,
    };
  }

  return {
    "import.meta.env.VITE_APP_VERSION": `"${getAppVersion()}"`,
  };
};

const isHumanchatApp = () => {
  const cwd = process.cwd();
  const pkgJsonPath = path.resolve(cwd, "package.json");

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString());

  return pkgJson?.humanchat;
};

const isGenesysAgentAssistApp = () => {
  const cwd = process.cwd();
  const pkgJsonPath = path.resolve(cwd, "package.json");

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString());

  return pkgJson?.genesysAgentAssist;
};

const getAppVersion = () => {
  const cwd = process.cwd();
  const pkgJsonPath = path.resolve(cwd, "package.json");

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString());

  return pkgJson?.version;
};

const createGetPackageName = () => {
  const cache: Record<string, string> = {};

  return () => {
    const cwd = process.cwd();

    if (cache[cwd] === undefined) {
      const pkgJsonPath = path.resolve(cwd, "package.json");
      const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString());
      cache[cwd] = pkgJson?.name || "";
    }

    return cache[cwd];
  };
};

const getPackageName = createGetPackageName();

const baseConfig: UserConfigExport = (env: ConfigEnv) => ({
  envDir: "../../",

  esbuild: {
    // This inlines @license and @preserve comments in builds.
    legalComments: "inline",
  },

  build: {
    target: "es2015",
    cssCodeSplit: false,
    outDir: "build",

    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
        assetFileNames: "assets/[name].[hash].[ext]",
        entryFileNames: "assets/[name].js",
      },
    },
  },

  define: {
    ...getDefine(env),
    ["process.env"]: JSON.stringify({
      NODE_ENV: getNodeEnv(env.mode),
    }),
  },

  plugins: [
    react({
      babel: {
        configFile: true,
        rootMode: "upward",
      },
    }),

    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: "eslint --quiet",
        dev: {
          logLevel: ["error"], // TODO: Consider showing warnings later, currently too many
        },
      },
    }),
  ],

  server: {
    host: true,
  },

  experimental: {
    renderBuiltUrl(filename: string) {
      const hc = isHumanchatApp();

      if (hc) {
        return `/${filename}`;
      }

      const genesysAgentAssist = isGenesysAgentAssistApp();

      if (genesysAgentAssist) {
        return `/genesys-agent-assist/${filename}`;
      }

      return `/static/reactApps/${filename}`;
    },
  },

  css: {
    postcss: {
      plugins: [postcssNesting()],
    },

    modules: {
      generateScopedName: (name, path) => {
        const filenameRegex = /([a-zA-Z]+)\.module\.s?css/;
        const packageNameRegex = /\/packages\/([a-zA-Z-]+)/;

        const [, packageName] = path.match(packageNameRegex) || [];
        const [, filename] = path.match(filenameRegex) || [];
        const basePackageName = getPackageName();
        const projectRelativePath = path.split("packages")[1];
        const hash = md5(basePackageName + projectRelativePath).substring(0, 8);

        return `${upperFirst(
          camelCase(packageName)
        )}-${filename}_${name}__${hash}`;
      },
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(baseConfig);

export const extendBaseConfig =
  (config: UserConfigExport) => (env: ConfigEnv) => {
    return defineConfig({
      ...baseConfig(env),
      ...config,
    });
  };
