/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['luathungbach.vn', 'suakhoathaibinh24h.vn', 'luatsukinhdo.com', 'luatsukinhdo.xyz'],
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
