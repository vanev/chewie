import { cyan } from "chalk"

// Deploy.Options.toPromptConfig :: Deploy.Options -> Promise<Prompt.Config>
const toPromptConfig = (options) => Promise.resolve({
  name: "response",
  message: `Are you sure you want to deploy to ${cyan(options.environment)}? [y/n]`,
})

export default toPromptConfig
