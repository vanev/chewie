const { promisify } = require('util')
const prompt = require("prompt")

// Prompt.get :: Prompt.Options -> Promise<Prompt.Result>
const get = (config, _prompt=prompt) => {
  _prompt.message = ""
  _prompt.delimiter = ""
  _prompt.start()

  return promisify(_prompt.get)(config)
}

module.exports = get
