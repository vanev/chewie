import { test } from "ava"
import toGitCommands from "./toGitCommands"

test("returns a promise containing a git command", (t) => {
  const options = {
    environment: "bar",
    marketplace: ["qux", "qas"],
    reference: "baz",
  }

  const expected = [
    {
      cmd: "foo",
      repository: "bar-qux",
      src: "baz",
      dst: "master",
      flags: ["--force"],
    },
    {
      cmd: "foo",
      repository: "bar-qas",
      src: "baz",
      dst: "master",
      flags: ["--force"],
    },
  ]
  return toGitCommands("foo")(options)
    .then((actual) => {
      t.deepEqual(actual, expected)
    })
})
