const { map } = require("ramda")

// Git.Command.toGitCommands :: String -> Deploy.Options -> [Git.Command]
const toGitCommands = (cmd) => (options) =>
  Promise.resolve(map((marketplace) => ({
    cmd,
    repository: `${options.environment}-${marketplace}`,
    src: options.reference,
    dst: "master",
    flags: ["--force"],
  }), options.marketplace))

module.exports = toGitCommands
