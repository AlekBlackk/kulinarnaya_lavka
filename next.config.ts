import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статическая сборка в папку out/ — подходит для любого хостинга с HTTPS, сервер Node.js не нужен.
  output: "export",
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
