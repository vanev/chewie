const { compose, prop, repeat, size, join, toString } = require("ramda")
const { red, green, yellow, magenta, grey } = require("chalk")
const { prepend } = require("../utils")

// log :: Any -> Any
const log = (any, _logger=console) => {
  _logger.log(any)
  return any
}

const logDog = compose(log, prepend("\n"), prepend("🐶  "))

const logMessage = log

const logError = compose(log, red, prepend("\n"), prepend("🚨  "), prop("message"))

const logWarning = compose(log, yellow, prepend("\n"), prepend("⚠️  "))

const logSuccess = compose(log, green, prepend("\n"), prepend("✅  "))

// logCallout :: Any -> Any
const logCallout = (any) => {
  const length = size(toString(any)) + 4
  const rows = [
    grey("+" + repeat(length - 2, "-") + "+"),
    grey("| ") + magenta(any) + grey(" |"),
    grey("+" + repeat(length - 2, "-") + "+"),
  ]

  log(join("\n", rows))

  return any
}

module.exports = {
  log,
  logDog,
  logMessage,
  logError,
  logWarning,
  logSuccess,
  logCallout,
}
