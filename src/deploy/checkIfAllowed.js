import { Future } from "ramda-fantasy"
import { compose, chain, map } from "ramda"
import setBuildState from "./setBuildState"
import { logSuccess } from "../logger"
import * as Options from "./options"

// logSuccessMessage :: Deploy.Options -> Deploy.Options
const logSuccessMessage = (options) => {
  logSuccess("Great! I'll get right on it.")
  return options
}

// Deploy.checkIfAllowed :: Deploy.Options -> Future Error Deploy.Options
const checkIfAllowed = compose(
  map(logSuccessMessage),
  chain(Options.confirm),
  chain(setBuildState),
  Future.of
)

export default checkIfAllowed
