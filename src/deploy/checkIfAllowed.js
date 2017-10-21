const { composeP } = require("ramda")
const Logger = require("../logger")
const Options = require("./options")

// logSuccessMessage :: Deploy.Options -> Promise<Deploy.Options>
const logSuccessMessage = (_Logger=Logger) => (options) => {
  _Logger.logSuccess("Great! I'll get right on it.")
  return Promise.resolve(options)
}

// Deploy.checkIfAllowed :: Deploy.Options -> Promise<Deploy.Options>
const checkIfAllowed = (options, _Logger=Logger, _Options=Options) => composeP(
  logSuccessMessage(_Logger),
  _Options.confirm
)(options)

module.exports = checkIfAllowed
