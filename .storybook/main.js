const path = require( "path" )
const { mergeConfig } = require( "vite" )

module.exports = {
  "stories": [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../globals/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-css-modules"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "features": {
    "storyStoreV7": true,
    "interactionsDebugger": true, // 👈 enable playback controls
  },
  "typescript": { "reactDocgen": false },
  "webpackFinal": async ( config ) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve( __dirname, "../styles" ),
      "@globals": path.resolve( __dirname, "../globals" ),
    }

    return config
  }
}