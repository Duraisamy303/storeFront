/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // distDir: 'build',
   // target: 'serverless',
  images: {
    domains: ['i.ibb.co','lh3.googleusercontent.com','res.cloudinary.com','file.prade.in'],
  },
}

module.exports = nextConfig
