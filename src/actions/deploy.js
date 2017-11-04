import { composeP } from "ramda"
import { cyan } from "chalk"
import * as Deploy from "../deploy"
import * as Git from "../git"
import * as Logger from "../logger"

// logWelcomeMessage :: Deploy.Options -> Promise<Deploy.Options>
const logWelcomeMessage = (options) => {
  Logger.logDog(`Deploying ${cyan(options.reference)} to ${cyan(options.marketplace)} ${cyan(options.environment)}`)
  return Promise.resolve(options)
}

// logCompleteMessage :: [Git.Result] -> Promise<[Git.Result]>
const logCompleteMessage = (results) => {
  Logger.logSuccess("Deploy completed successfully!")
  return Promise.resolve(results)
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

export default deploy
