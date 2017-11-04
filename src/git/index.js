import { composeP } from "ramda"
import * as Command from "./command"
import * as Deploy from "../deploy"

// Git.executePush :: Deploy.Options -> Promise<Git.Result>
export const executePush = composeP(
  Command.executeAll,
  Deploy.Options.toGitCommands("push")
)
