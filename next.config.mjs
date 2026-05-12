/** @type {import('next').Config} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // এই নতুন ডোমেইনটি যোগ করা হলো
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc', // এই নতুন ডোমেইনটি যোগ করা হলো
      },
      {
        protocol: 'https',
        hostname:'i.pravatar.cc',
      }
    ],
  },
};

export default nextConfig;