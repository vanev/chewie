import { test } from "ava"
import executeAll from "./executeAll"

test.skip("returns a promise containing an array of results", (t) => {
  const commands = [
    {
      cmd: "foo",
      repository: "bar-qux",
      src: "baz",
      dst: "master",
      flags: ["--force"],
    },
    {
      cmd: "one",
      repository: "two-three",
      src: "four",
      dst: "master",
      flags: ["--force"],
    },
  ]

  const expected = [
    {},
  ]
  return executeAll(commands)
    .then((actual) => {
      t.deepEqual(actual, expected)
    })
})
