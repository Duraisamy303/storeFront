// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // distDir: 'build',
//    // target: 'serverless',
//   images: {
//     domains: ['i.ibb.co','lh3.googleusercontent.com','res.cloudinary.com','file.prade.in'],
//   },
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['file.prade.in','prade.blr1.cdn.digitaloceanspaces.com','prade.blr1.digitaloceanspaces.com'], // Add your image domain here
  },
};

module.exports = nextConfig;


