import { promisify } from "util"
import prompt from "prompt"

// Prompt.get :: Prompt.Options -> Promise<Prompt.Result>
const get = (config, _prompt=prompt) => {
  _prompt.message = ""
  _prompt.delimiter = ""
  _prompt.start()

  return promisify(_prompt.get)(config)
}

export default get
