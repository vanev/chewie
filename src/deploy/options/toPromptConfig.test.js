import { test } from "ava"
import toPromptConfig from "./toPromptConfig"

test("returns a promise of prompt configuration", (t) => {
  const options = {
    environment: "foo"
  }

  return toPromptConfig(options)
    .then((config) => {
      t.regex(config.message, /foo/)
      t.is(config.name, "response")
    })
})
