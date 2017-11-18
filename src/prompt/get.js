import { Future } from "ramda-fantasy"
import prompt from "prompt"

let dependencies = {
  prompt,
}
export const di = (newDependencies) => {
  dependencies = { ...dependencies, ...newDependencies }
}

// Prompt.get :: Prompt.Options -> Future Error Prompt.Result
const get = (config) => Future((reject, resolve) => {
  dependencies.prompt.message = ""
  dependencies.prompt.delimiter = ""
  dependencies.prompt.start()

  dependencies.prompt.get(config, (error, result) => {
    if (error) return reject(error)
    return resolve(result)
  })
})

export default get
