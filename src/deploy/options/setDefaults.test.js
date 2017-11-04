import { test } from "ava"
import setDefaults from "./setDefaults"

test("returns a promise of options with defaults set", (t) => {
  const options = {
    reference: "foo",
  }

  const expected = {
    environment: "staging",
    marketplace: ["grailed"],
    reference: "foo",
  }
  return setDefaults(options)
    .then((actual) => {
      t.deepEqual(actual, expected)
    })
})
