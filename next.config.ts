import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статическая сборка в папку out/ — подходит для любого хостинга с HTTPS, сервер Node.js не нужен.
  output: "export",
  // Нужен только для GitHub Pages: сайт лежит в подпапке /<имя-репозитория>. На других хостингах не задаётся.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
