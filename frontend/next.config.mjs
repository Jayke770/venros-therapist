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
  poweredByHeader: false,
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${new URL(process.env.APP_BACKEND).toString()}api/:path*`,
      },
    ];
  },
};

export default nextConfig;
