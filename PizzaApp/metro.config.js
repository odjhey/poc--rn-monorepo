// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
})

const path = require("path")
config.watchFolders = [
  path.resolve(__dirname, "../modules/app-state"),
  path.resolve(__dirname, "../node_modules"),
]

module.exports = config
