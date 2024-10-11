/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['luathungbach.vn'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'secure.gravatar.com',
                pathname: '/avatar/**',
            },
        ],
    },
    experimental: {
        optimizeCss: true, // Tối ưu hóa CSS
    },
    optimizeFonts: true, // Tối ưu hóa tải font từ Google
};

export default nextConfig;
