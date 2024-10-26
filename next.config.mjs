await import("./env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                pathname: "/a/yx2a1d1a1r/*",
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};
 
export default nextConfig;