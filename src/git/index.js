import { compose } from "ramda"
import * as Command from "./command"
import * as Deploy from "../deploy"

// Git.executePush :: Deploy.Options -> Future Error (Array Git.Result)
export const executePush = compose(
  Command.executeAll,
  Deploy.Options.toGitCommands("push"),
)
