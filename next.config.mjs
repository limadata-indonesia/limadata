/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "limadata.co.id" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
};
export default nextConfig;
