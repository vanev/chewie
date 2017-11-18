import { test } from "ava"
import toPromptConfig from "./toPromptConfig"

test("returns a prompt configuration", (t) => {
  const options = {
    environment: "foo"
  }

  const actual = toPromptConfig(options)

  t.regex(actual.message, /foo/)
  t.is(actual.name, "response")
})
