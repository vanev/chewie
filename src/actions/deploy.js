import { compose, chain } from "ramda"
import { cyan } from "chalk"
import * as Deploy from "../deploy"
import * as Git from "../git"
import * as Logger from "../logger"

// renderWelcomeMessage :: Deploy.Options -> Deploy.Options
const renderWelcomeMessage = (options) => {
  Logger.logDog(`Deploying ${cyan(options.reference)} to ${cyan(options.marketplace)} ${cyan(options.environment)}`)
  return options
}

// renderCompleteMessage :: [Git.Result] -> [Git.Result]
const renderCompleteMessage = (results) => {
  Logger.logSuccess("Deploy completed successfully!")
  return results
}

// handleError :: Error -> Error
const handleError = (error) => {
  Logger.logError(error)
}

// steps :: Deploy.Options -> Future Error (Array Git.Result)
const steps = compose(
  chain(Git.executePush),
  Deploy.checkIfAllowed,
  renderWelcomeMessage,
  Deploy.Options.setDefaults
)

// Actions.deploy :: Deploy.Options -> Void
const deploy = (options) => {
  steps(options).fork(handleError, renderCompleteMessage)
}

export default deploy
