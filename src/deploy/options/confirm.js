import { Future } from "ramda-fantasy"
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
  map(Prompt.Result.checkIfAnswer(["y", "yes"])),
  chain(dependencies.promptGet),
  map(toPromptConfig),
  Future.of
)(options)

export default confirm
