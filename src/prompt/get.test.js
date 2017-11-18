import { test } from "ava"
import get, { di } from "./get"

test.cb("sets up the prompt and returns a future containing a result", (t) => {
  const testConfig = {}
  let startHasBeenCalled = false
  const prompt = {
    message: "foo",
    delimiter: "bar",
    start: () => {
      startHasBeenCalled = true
    },
    get: (config, callback) => {
      if (config === testConfig) return callback(null, { response: "y" })
    },
  }

  di({ prompt })

  const expected = { response: "y" }

  get(testConfig, prompt).fork(t.end, (actual) => {
    t.is(prompt.message, "")
    t.is(prompt.delimiter, "")
    t.true(startHasBeenCalled)
    t.deepEqual(actual, expected)
    t.end()
  })
})
