import { composeP } from "ramda"
import * as Prompt from "../../prompt"
import toPromptConfig from "./toPromptConfig"

// Deploy.Options.confirm :: Deploy.Options -> Promise<Deploy.Options>
const confirm = (options, _Prompt=Prompt) => composeP(
  () => Promise.resolve(options),
  _Prompt.Result.checkIfAnswer(["y", "yes"]),
  _Prompt.get,
  toPromptConfig
)(options)

export default confirm
