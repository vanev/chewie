import Future from "fluture"
import { compose, map } from "ramda"
import execute from "./execute"

let dependencies = {
  execute,
}
export const di = (newDependencies) => {
  dependencies = { ...dependencies, ...newDependencies }
}

const LIMIT = Infinity

// Git.Command.executeAll :: Array Git.Command -> Future Error (Array Git.Result)
const executeAll = (commands) => compose(
  Future.parallel(LIMIT),
  map(dependencies.execute)
)(commands)

export default executeAll
