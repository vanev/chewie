const { test } = require("ava")
const prepend = require("./prepend")

test("Utils.prepend", (t) => {
  const actual = prepend("🤖")("foo")
  const expected = "🤖foo"
  t.is(actual, expected)
})
