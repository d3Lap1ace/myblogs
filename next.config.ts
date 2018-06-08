import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
    basePath: '/myblogs',
    assetPrefix: '/myblogs/',
    images: {
        unoptimized: true,
        remotePatterns: [],
    },
};

export default nextConfig;
