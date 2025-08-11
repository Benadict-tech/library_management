/** @type {import('next').NextConfig} */
const nextConfig = {
      async redirects() {
    return [
      {
        source: '/old',
        destination: '/new',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
