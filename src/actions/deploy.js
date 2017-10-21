const { composeP } = require("ramda")
const { cyan } = require("chalk")
const Deploy = require("../deploy")
const Git = require("../git")
const Logger = require("../logger")

// logWelcomeMessage :: Deploy.Options -> Promise<Deploy.Options>
const logWelcomeMessage = (options) => {
  Logger.logDog(`Deploying ${cyan(options.reference)} to ${cyan(options.marketplace)} ${cyan(options.environment)}`)
  return Promise.resolve(options)
}

// logCompleteMessage :: Git.Result -> Promise<Git.Result>
const logCompleteMessage = (result) => {
  Logger.logSuccess("Deploy completed successfully!")
  return Promise.resolve(result)
}

// handleError :: Error -> Error
const handleError = (error) => {
  Logger.logError(error)
}

// Actions.deploy :: Deploy.Options -> Promise<Git.Result>
const deploy = (options) =>
  composeP(
    logCompleteMessage,
    Git.executePush,
    Deploy.checkIfAllowed,
    logWelcomeMessage,
    Deploy.Options.setDefaults
  )(options)
    .catch(handleError)

module.exports = deploy
