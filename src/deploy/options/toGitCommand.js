// Git.Command.fromDeployOptions :: String -> Deploy.Options -> Command
const fromDeployOptions = (cmd) => (options) =>
  Promise.resolve({
    cmd,
    repository: `${options.environment}-${options.marketplace}`,
    src: options.reference,
    dst: "master",
    flags: ["--force"],
  })

module.exports = fromDeployOptions
