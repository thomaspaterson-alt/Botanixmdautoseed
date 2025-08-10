// next.config.js
const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  webpack: (config) => {
    // If you *ever* want to go back to "@/..." paths, uncomment:
    // config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};
