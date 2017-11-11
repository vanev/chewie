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

  const Travis = {
    getBranchState: () => () => Promise.resolve("foo"),
    authenticate: () => Promise.resolve(),
  }

  const expected = {
    buildState: "foo",
  }

  return checkIfAllowed(options, Logger, Options, Travis)
    .then((actual) => {
      t.deepEqual(actual, expected)
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
