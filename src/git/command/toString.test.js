const { test } = require("ava")
const toString = require("./toString")

test("returns a string of the important stuff", (t) => {
  const command = {
    cmd: "push",
    repository: "origin",
    src: "master",
    dst: "master",
    flags: ["--force"]
  }

  const actual = toString(command)

  const expected = "git push origin master:master --force"
  t.is(actual, expected)
})
