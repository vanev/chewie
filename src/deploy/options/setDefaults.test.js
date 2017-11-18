import { test } from "ava"
import setDefaults from "./setDefaults"

test("returns a future of options with defaults set", (t) => {
  const options = {
    reference: "foo",
  }

  const actual = setDefaults(options)

  const expected = {
    environment: "staging",
    marketplace: ["grailed"],
    reference: "foo",
  }
  t.deepEqual(actual, expected)
})
