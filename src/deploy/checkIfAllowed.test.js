import { test } from "ava"
import checkIfAllowed from "./checkIfAllowed"

test("when allowed, log a message and return a promise of those options", (t) => {
  const options = {}

  let logSuccessCalled = false
  const Logger = {
    logSuccess: () => logSuccessCalled = true
  }

  const Options = {
    confirm: (options) => Promise.resolve(options)
  }

  return checkIfAllowed(options, Logger, Options)
    .then((actual) => {
      t.is(actual, options)
      t.true(logSuccessCalled)
    })
})

test("when not allowed, throw an error ", (t) => {
  const options = {}

  let logSuccessCalled = false
  const Logger = {
    logSuccess: () => logSuccessCalled = true
  }

  const error = new Error()

  const Options = {
    confirm: () => Promise.reject(error)
  }

  return checkIfAllowed(options, Logger, Options)
    .catch((actual) => {
      t.is(actual, error)
      t.false(logSuccessCalled)
    })
})
