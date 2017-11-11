import { composeP } from "ramda"
import * as Logger from "../logger"
import * as Travis from "../travis"
import * as Options from "./options"
import setBuildState from "./setBuildState"

// logSuccessMessage :: Deploy.Options -> Promise<Deploy.Options>
const logSuccessMessage = (_Logger=Logger) => (options) => {
  _Logger.logSuccess("Great! I'll get right on it.")
  return Promise.resolve(options)
}

// Deploy.checkIfAllowed :: Deploy.Options -> Promise<Deploy.Options>
const checkIfAllowed = (options, _Logger=Logger, _Options=Options, _Travis=Travis) => composeP(
  logSuccessMessage(_Logger),
  _Options.confirm,
  setBuildState(_Travis)
)(options)

export default checkIfAllowed
