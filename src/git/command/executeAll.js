import { Future } from "ramda-fantasy"
import { traverse } from "ramda"
import execute from "./execute"

let dependencies = {
  execute,
}
export const di = (newDependencies) => {
  dependencies = { ...dependencies, ...newDependencies }
}

// Git.Command.executeAll :: Array Git.Command -> Future Error (Array Git.Result)
const executeAll = (commands) => traverse(Future.of, dependencies.execute, commands)

export default executeAll
