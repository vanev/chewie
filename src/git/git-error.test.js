const { test } = require("ava")
const GitError = require("./git-error")

test(".message contains the code", (t) => {
  const result = { code: 500 }
  const subject = new GitError(result)

  const actual = subject.message

  const expected = "Something went wrong! (Code: 500)"
  t.is(actual, expected)
})
