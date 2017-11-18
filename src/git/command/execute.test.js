import { test } from "ava"
import execute, { di } from "./execute"

test.cb("returns a future containing a result", (t) => {
  const command = {
    cmd: "foo",
    repository: "bar-qux",
    src: "baz",
    dst: "master",
    flags: ["--force"],
  }

  let timesLogCalled = 0
  const Logger = {
    log: () => timesLogCalled++,
  }

  const child = {
    stdout: {
      setEncoding: (type) => {
        if (type === "utf8") {
          return {
            on: (key, callback) => {
              if (key === "data") return callback("foo bar baz")
            }
          }
        }
      },
    },
    stderr: {
      setEncoding: (type) => {
        if (type === "utf8") {
          return {
            on: (key, callback) => {
              if (key === "data") return callback("hoo jar jaz")
            }
          }
        }
      },
    },
    on: (key, callback) => {
      if (key === "close") callback(0)
    },
  }
  const spawn = (command, args) => {
    if (
      command === "git" &&
      args[0] === "foo" &&
      args[1] === "bar-qux" &&
      args[2] === "baz:master" &&
      args[3] === "--force"
    ) {
      return child
    }
  }

  di({ spawn, Logger })

  const expected = {
    code: 0,
    stdout: ["foo bar baz"],
    stderr: ["hoo jar jaz"],
  }
  execute(command).fork(t.end, (actual) => {
    t.deepEqual(actual, expected)
    t.is(timesLogCalled, 2)
    t.end()
  })
})
