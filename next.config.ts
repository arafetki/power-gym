import type { NextConfig } from 'next';
import "@/env";
 
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                pathname: "/a/yx2a1d1a1r/*",
            }
        ]
    },
};
 
export default nextConfig;