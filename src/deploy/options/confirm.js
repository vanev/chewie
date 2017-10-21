const { composeP } = require("ramda")
const Prompt = require("../../prompt")
const toPromptConfig = require("./toPromptConfig")

// Deploy.Options.confirm :: Deploy.Options -> Promise<Deploy.Options>
const confirm = (options, _Prompt=Prompt) => composeP(
  () => Promise.resolve(options),
  _Prompt.Result.checkIfAnswer(["y", "yes"]),
  _Prompt.get,
  toPromptConfig
)(options)

module.exports = confirm
