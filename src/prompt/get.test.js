const { test } = require("ava")
const get = require("./get")

test("sets up the prompt and returns a promise containing a result", (t) => {
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

  const expected = { response: "y" }

  return get(testConfig, prompt)
    .then((actual) => {
      t.is(prompt.message, "")
      t.is(prompt.delimiter, "")
      t.true(startHasBeenCalled)
      t.deepEqual(actual, expected)
    })
})
