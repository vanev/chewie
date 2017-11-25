import Future from "fluture"
import prompt from "prompt"

let dependencies = {
  prompt,
}
export const di = (newDependencies) => {
  dependencies = { ...dependencies, ...newDependencies }
}

// Prompt.get :: Prompt.Options -> Future Error Prompt.Result
const get = (config) => Future.node((done) => {
  dependencies.prompt.message = ""
  dependencies.prompt.delimiter = ""
  dependencies.prompt.start()

  dependencies.prompt.get(config, done)
})

export default get
