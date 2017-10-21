const { test } = require("ava")
const confirm = require("./confirm")

test("when confirmed, returns a promise of given deploy options", (t) => {
  const options = {
    environment: "foo",
  }
  const Prompt = {
    Result: {
      checkIfAnswer: () => () => Promise.resolve(),
    },
    get: () => Promise.resolve(),
  }

  return confirm(options, Prompt)
    .then((actual) => {
      t.deepEqual(actual, options)
    })
})
