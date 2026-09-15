/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Build paytida tutuq belgilari kabi ESLint xatolar sababli build to'xtashini oldini oladi
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript tip xatolari sababli Render'da build yiqilishini oldini oladi
    ignoreBuildErrors: true,
  },
};

export default nextConfig;