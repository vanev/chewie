const { test } = require("ava")
const toGitCommand = require("./toGitCommand")

test("returns a promise containing a git command", (t) => {
  const options = {
    environment: "bar",
    marketplace: "qux",
    reference: "baz",
  }

  const expected = {
    cmd: "foo",
    repository: "bar-qux",
    src: "baz",
    dst: "master",
    flags: ["--force"],
  }
  return toGitCommand("foo")(options)
    .then((actual) => {
      t.deepEqual(actual, expected)
    })
})
