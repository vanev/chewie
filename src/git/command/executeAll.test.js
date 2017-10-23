const { test } = require("ava")
const executeAll = require("./executeAll")

test.skip("returns a promise containing an array of results", (t) => {
  const commands = [
    {},
  ]

  const expected = [
    {},
  ]
  return executeAll(commands)
    .then((actual) => {
      t.deepEqual(actual, expected)
    })
})
