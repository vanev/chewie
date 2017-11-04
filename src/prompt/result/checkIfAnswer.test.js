import { test } from "ava"
import checkIfAnswer from "./checkIfAnswer"

test("when response is allowed", (t) => {
  const testResult = { response: "foo" }
  return checkIfAnswer(["foo", "bar"])(testResult)
    .then((result) => {
      t.is(result, testResult)
    })
})

test("when response is not allowed", (t) => {
  const testResult = { response: "qux" }
  return checkIfAnswer(["foo", "bar"])(testResult)
    .catch(() => t.pass())
})
