import { assoc, composeP, __, is } from "ramda"
import * as Travis from "../travis"

const handleTravisError = (error) => {
  if (is(Travis.BranchNotFoundError)) return Promise.resolve("unknown")

  throw error
}

const getBranchState = ({ reference }, _Travis=Travis) => () => composeP(
  _Travis.getBranchState(reference),
  _Travis.authenticate
)().catch(handleTravisError)

// Deploy.setBuildState :: Deploy.Options -> Promise<Deploy.Options>
const setBuildState = (_Travis=Travis) => (options) => composeP(
  assoc("buildState", __, options),
  getBranchState(options, _Travis),
)()

export default setBuildState
