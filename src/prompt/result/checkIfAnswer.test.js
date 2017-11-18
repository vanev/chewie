import { test } from "ava"
import checkIfAnswer from "./checkIfAnswer"

test("when response is allowed", (t) => {
  const testResult = { response: "foo" }

  let actual
  t.notThrows(() => {
    actual = checkIfAnswer(["foo", "bar"])(testResult)
  })

  const expected = testResult
  t.is(actual, expected)
})

test("when response is not allowed", (t) => {
  const testResult = { response: "qux" }

  const actual = t.throws(() => {
    checkIfAnswer(["foo", "bar"])(testResult)
  }, Error)

  const expected = new Error("That's okay, I'll be here if you need me!")
  t.deepEqual(actual, expected)
})
