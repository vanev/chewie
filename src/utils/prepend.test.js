import { test } from "ava"
import prepend from "./prepend"

test("Utils.prepend", (t) => {
  const actual = prepend("🤖")("foo")
  const expected = "🤖foo"
  t.is(actual, expected)
})
