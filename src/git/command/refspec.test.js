const { test } = require("ava")
const refspec = require("./refspec")

test("returns a git refspec", (t) => {
  const command = {
    src: "foo",
    dst: "bar",
  }

  const actual = refspec(command)

  const expected = "foo:bar"
  t.is(actual, expected)
})
