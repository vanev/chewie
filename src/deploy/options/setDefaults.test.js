const { test } = require("ava")
const setDefaults = require("./setDefaults")

test("returns a promise of options with defaults set", (t) => {
  const options = {
    reference: "foo",
  }

  const expected = {
    environment: "staging",
    marketplace: "grailed",
    reference: "foo",
  }
  return setDefaults(options)
    .then((actual) => {
      t.deepEqual(actual, expected)
    })
})
