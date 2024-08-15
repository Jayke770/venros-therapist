/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  },
  rewrites: async () => [
    {
      source: "/:path*",
      destination: `${
        process?.env?.BACKEND_ENDPOINT ?? "http://127.0.0.1:8000"
      }/:path*`,
    },
  ],
};

export default nextConfig;
