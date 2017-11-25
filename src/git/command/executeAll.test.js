import { test } from "ava"
import Future from "fluture"
import executeAll, { di } from "./executeAll"

test.cb("returns a future containing an array of results", (t) => {
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
  const execute = ({ repository, src }) => Future.of({ foo: repository, bar: src })

  di({ execute })

  const expected = [
    { foo: "bar-qux", bar: "baz" },
    { foo: "two-three", bar: "four" },
  ]

  executeAll(commands).fork(t.end, (actual) => {
    t.deepEqual(actual, expected)
    t.end()
  })
})
