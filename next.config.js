/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Nhập link ngrok đang chạy backend của bạn vào đây
        destination: NEXT_PUBLIC_API_URL,
      },
    ]
  },
}

module.exports = nextConfig