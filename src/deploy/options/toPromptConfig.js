import { ifElse, equals, compose, prop } from "ramda"
import { cyan, red, green } from "chalk"

const status = compose(
  ifElse(equals("passed"), green, red),
  prop("buildState")
)

// Deploy.Options.toPromptConfig :: Deploy.Options -> Prompt.Config
const toPromptConfig = (options) => ({
  name: "response",
  message: `The most recent build status is: ${status(options)}.\nAre you sure you want to deploy to ${cyan(options.environment)}? [y/n]`,
})

export default toPromptConfig
