const { execSync } = require("child_process")
const { trim, toString, compose, propOr } = require("ramda")

const ENVIRONMENTS = ["staging", "production"]

const MARKETPLACES = ["grailed", "heroine"]

const ALL = "all"

// setEnvironment :: Deploy.Options -> String
const setEnvironment = propOr(ENVIRONMENTS[0], "environment")

// setMarketplace :: Deploy.Options -> String
const setMarketplace = ({ marketplace=MARKETPLACES[0] }) =>
  (marketplace === ALL) ? MARKETPLACES : [marketplace]

const DEFAULT_REF_GIT_COMMAND = "git rev-parse --abbrev-ref HEAD"
// getDefaultReference :: String -> String
const getDefaultReference = (cmd=DEFAULT_REF_GIT_COMMAND) => compose(
  trim,
  toString,
  execSync
)(cmd)

// setReference :: Deploy.Options -> String
const setReference = propOr(getDefaultReference(), "reference")

// Deploy.Options.setDefaults :: Deploy.Options -> Promise<Deploy.Options>
const setDefaults = (options) => Promise.resolve({
  environment: setEnvironment(options),
  marketplace: setMarketplace(options),
  reference: setReference(options),
})

module.exports = setDefaults
