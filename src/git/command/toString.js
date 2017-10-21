const { join } = require("ramda")
const refspec = require("./refspec")

// Git.Command.toString :: Git.Command -> String
const toString = (command) => join(" ", [
  "git",
  command.cmd,
  command.repository,
  refspec(command),
  ...command.flags,
])

module.exports = toString
