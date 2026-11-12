/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // حجم كبير يكفي ملفات PDF/ZIP حقيقية
      bodySizeLimit: "100mb",
    },
  },
};

module.exports = nextConfig;
