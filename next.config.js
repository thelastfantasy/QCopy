/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // serverRuntimeConfig: {
  //   // 将服务器端渲染（SSR）关闭
  //   disableServerSideRender: true
  // },
  // publicRuntimeConfig: {
  //   // 将服务器端渲染（SSR）关闭
  //   disableServerSideRender: true
  // }
};

module.exports = nextConfig;
