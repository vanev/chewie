import { test } from "ava"
import refspec from "./refspec"

test("returns a git refspec", (t) => {
  const command = {
    src: "foo",
    dst: "bar",
  }

  const actual = refspec(command)

  const expected = "foo:bar"
  t.is(actual, expected)
})
