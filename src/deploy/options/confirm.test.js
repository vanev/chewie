import { test } from "ava"
import Future from "fluture"
import confirm, { di } from "./confirm"

test.cb("when confirmed, returns a future of given deploy options", (t) => {
  const options = {
    environment: "foo",
  }
  const promptGet = () => Future.of({ response: "y" })

  di({ promptGet })

  const onRejected = t.end
  const onResolved = (actual) => {
    t.deepEqual(actual, options)
    t.end()
  }

  confirm(options).fork(onRejected, onResolved)
})
