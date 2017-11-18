import { map } from "ramda"

// Git.Command.toGitCommands :: String -> Deploy.Options -> Array Git.Command
const toGitCommands = (cmd) => (options) =>
  map((marketplace) => ({
    cmd,
    repository: `${options.environment}-${marketplace}`,
    src: options.reference,
    dst: "master",
    flags: ["--force"],
  }), options.marketplace)

export default toGitCommands
