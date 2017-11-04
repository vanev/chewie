import { compose, prop, repeat, size, join, toString } from "ramda"
import { red, green, yellow, magenta, grey } from "chalk"
import { prepend } from "../utils"

// log :: Any -> Any
export const log = (any, _logger=console) => {
  _logger.log(any)
  return any
}

export const logDog = compose(log, prepend("\n"), prepend("🐶  "))

export const logMessage = log

export const logError = compose(log, red, prepend("\n"), prepend("🚨  "), prop("message"))

export const logWarning = compose(log, yellow, prepend("\n"), prepend("⚠️  "))

export const logSuccess = compose(log, green, prepend("\n"), prepend("✅  "))

// logCallout :: Any -> Any
export const logCallout = (any) => {
  const length = size(toString(any)) + 4
  const rows = [
    grey("+" + repeat(length - 2, "-") + "+"),
    grey("| ") + magenta(any) + grey(" |"),
    grey("+" + repeat(length - 2, "-") + "+"),
  ]

  log(join("\n", rows))

  return any
}
