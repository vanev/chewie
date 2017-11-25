import Future from "fluture"
import { compose, map, chain } from "ramda"
import toPromptConfig from "./toPromptConfig"
import * as Prompt from "../../prompt"

let dependencies = {
  promptGet: Prompt.get,
}

export const di = (newDependencies) => {
  dependencies = { ...dependencies, ...newDependencies }
}

// Deploy.Options.confirm :: Deploy.Options -> Future Error Deploy.Options
const confirm = (options) => compose(
  map(() => options),
  chain(Future.encase(Prompt.Result.checkIfAnswer(["y", "yes"]))),
  dependencies.promptGet,
  toPromptConfig
)(options)

export default confirm
