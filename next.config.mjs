import { env } from "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                pathname: `/a/${env.UPLOADTHING_APP_ID}/*`,
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        NEXT_PUBLIC_SITE_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000'
    },
    async redirects() {
        return [
        {
            source: '/auth/account-settings',
            destination: '/account',
            permanent: true,
        },
        ]
    },
};
 
export default nextConfig;