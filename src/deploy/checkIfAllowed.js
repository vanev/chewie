import { composeP } from "ramda"
import * as Logger from "../logger"
import * as Options from "./options"

// logSuccessMessage :: Deploy.Options -> Promise<Deploy.Options>
const logSuccessMessage = (_Logger=Logger) => (options) => {
  _Logger.logSuccess("Great! I'll get right on it.")
  return Promise.resolve(options)
}

// Deploy.checkIfAllowed :: Deploy.Options -> Promise<Deploy.Options>
const checkIfAllowed = (options, _Logger=Logger, _Options=Options) => composeP(
  logSuccessMessage(_Logger),
  _Options.confirm
)(options)

export default checkIfAllowed
