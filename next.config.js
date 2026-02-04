/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_OUTPUT_MODE,
  env: {
    RSA_PRIVATE_KEY: process.env.RSA_PRIVATE_KEY,
    NEXT_PUBLIC_RSA_PUBLIC_KEY: process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY,
  },

  /**
   *
   * @param {import('webpack').Configuration} config
   * @param {import('next/dist/server/config-shared').WebpackConfigContext} context
   * @returns {import('webpack').Configuration}
   */
  webpack: (config) => {
    if (process.env.NEXT_OUTPUT_MODE !== "export" || !config.module) {
      return config
    }
    config.module.rules?.push({
      test: /src\/pages\/api/,
      loader: "ignore-loader",
    })
    return config
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  turbopack: {}
}
module.exports = nextConfig

