import { execSync } from "child_process"
import { trim, toString, compose, propOr } from "ramda"

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


// Deploy.Options.setDefaults :: Deploy.Options -> Deploy.Options
const setDefaults = (options) => ({
  environment: setEnvironment(options),
  marketplace: setMarketplace(options),
  reference: setReference(options),
})

export default setDefaults
