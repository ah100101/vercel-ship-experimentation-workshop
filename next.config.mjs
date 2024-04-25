/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  }
};

import withVercelToolbar from "@vercel/toolbar/plugins/next";
export default withVercelToolbar()(nextConfig);
