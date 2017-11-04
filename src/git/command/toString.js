import { join } from "ramda"
import refspec from "./refspec"

// Git.Command.toString :: Git.Command -> String
const toString = (command) => join(" ", [
  "git",
  command.cmd,
  command.repository,
  refspec(command),
  ...command.flags,
])

export default toString
