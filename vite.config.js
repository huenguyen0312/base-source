import fs from "node:fs";
import path from 'node:path';

import { defineConfig } from "vite";
import { resolve } from "node:path";

import postcssCustomMedia from "postcss-custom-media";
import postcssMediaMinMax from "postcss-media-minmax";
import cssDeclarationSorter from "css-declaration-sorter";

import handlebars from "vite-plugin-handlebars";

const files = [];
function readDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);

    if (fs.statSync(itemPath).isDirectory()) {
      if (item === "components") {
        continue;
      }

      readDirectory(itemPath);
    } else {
      if (path.extname(itemPath) !== ".html") {
        continue;
      }

      let name;
      if (dirPath === path.resolve(__dirname, "src")) {
        name = path.parse(itemPath).name;
      } else {
        const relativePath = path.relative(
          path.resolve(__dirname, "src"),
          dirPath,
        );
        const dirName = relativePath.replace(/\//g, "_");
        name = `${dirName}_${path.parse(itemPath).name}`;
      }

      const relativePath = path.relative(
        path.resolve(__dirname, "src"),
        itemPath,
      );
      const filePath = `/${relativePath}`;

      files.push({ name, path: filePath });
    }
  }
}
readDirectory(path.resolve(__dirname, "src"));
const inputFiles = {};
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  inputFiles[file.name] = resolve(__dirname, `./src${file.path}`);
}

const htmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV !== "production") {
        return;
      }

      const date = new Date();
      const param =
        date.getFullYear() +
        date.getMonth() +
        date.getDate() +
        date.getHours() +
        date.getMinutes() +
        date.getSeconds();

      const setParamHtml = html.replace(
        /(?=.*<link)(?=.*css)(?!.*https).*$/gm,
        (match) => {
          return match.replace(/\.css/, `.css?${param}`);
        },
      );

      return setParamHtml.replace(
        /(?=.*<script)(?=.*js)(?!.*https).*$/gm,
        (match) => {
          return match.replace(/\.js/, `.js?${param}`);
        },
      );
    },
  };
};

export default defineConfig({
  server: {
    host: true,
  },
  base: "./",
  root: "./src",
  publicDir: "../public",
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components/"),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssCustomMedia(),
        postcssMediaMinMax(),
        cssDeclarationSorter({ order: "smacss" }),
      ],
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".")[1];
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = "fonts";
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          }
          if (extType === "css") {
            // console.log(assetInfo.name);
            // * CSS names are resolved by being loaded into two or more pieces of HTML.
            //   To avoid the issue, you must load the same CSS on the two pages when outputting to forms.css.
            if (assetInfo.name === "styles.css") {
              return "assets/css/styles.css";
            }
            // if (assetInfo.name === 'forms.css') {
            //   return `assets/css/forms.css`;
            // }
            // if (assetInfo.name === 'search.css') {
            //   return `assets/css/search.css`;
            // }
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
      },
      input: inputFiles,
    },
    modulePreload: false,
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "./src/components"),
    }),
    // htmlPlugin(),
  ],
});
