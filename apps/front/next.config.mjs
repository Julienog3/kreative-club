/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en-US", "fr"],
    defaultLocale: "fr",
  },
  distDir: "./dist",
};

export default nextConfig;
