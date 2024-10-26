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
      {
        source: "/file/:path*",
        destination: `https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/:path*`,
      }
    ];
  },
};

export default nextConfig;
