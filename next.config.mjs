/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Passe-le à false temporairement
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
