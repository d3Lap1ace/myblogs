import type { NextConfig } from "next";
import { redirect } from "next/dist/server/api-utils";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
    basePath: '/myblogs',
    assetPrefix: '/myblogs/',
    images: { unoptimized: true }
};

module.exports = {
    async redirect() {
        return [
            {
                source: '/',
                destination: '/myblogs',
                permanent: false,
            }
        ]
    }
}

export default nextConfig;
