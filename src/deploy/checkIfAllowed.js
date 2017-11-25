import { compose, map, chain } from "ramda"
import setBuildState from "./setBuildState"
import { logDog } from "../logger"
import * as Options from "./options"

// logAllowedMessage :: Deploy.Options -> Deploy.Options
const logAllowedMessage = (options) => {
  logDog("Great! I'll get right on it.")
  return options
}

// Deploy.checkIfAllowed :: Deploy.Options -> Future Error Deploy.Options
const checkIfAllowed = compose(
  map(logAllowedMessage),
  chain(Options.confirm),
  setBuildState
)

export default checkIfAllowed
