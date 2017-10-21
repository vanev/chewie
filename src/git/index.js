const { composeP } = require("ramda")
const Command = require("./command")
const Deploy = require("../deploy")

// Git.executePush :: Deploy.Options -> Promise<Git.Result>
const executePush = composeP(
  Command.execute,
  Deploy.Options.toGitCommand("push")
)

module.exports = {
  executePush,
}
