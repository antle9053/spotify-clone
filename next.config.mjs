/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                hostname: "lasvcwigpukpiyyphadu.supabase.co",
            },
        ],
    },
};

export default nextConfig;
