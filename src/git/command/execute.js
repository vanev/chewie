const { trim } = require("ramda")
const { spawn } = require("child_process")
const Logger = require("../../logger")
const GitError = require("../git-error")
const refspec = require("./refspec")

// onChildClose :: Function, Function, Array<String>, Array<String> -> Number -> Git.Result
const onChildClose = (resolve, reject, stdout, stderr) => (code) => {
  const result = { code, stdout, stderr }
  if (code !== 0) return reject(new GitError(result))
  return resolve(result)
}

// handleOutputData :: Array<String>, Logger -> String -> Void
const handleOutputData = (stdio, _Logger=Logger) => (data) => {
  _Logger.log(trim(data))
  stdio.push(data)
}

// Git.Command.execute :: Git.Command -> Promise<Git.Result>
const execute = (command, _Logger=Logger, _spawn=spawn) =>
  new Promise((resolve, reject) => {
    const args = [
      command.cmd,
      command.repository,
      refspec(command),
      ...command.flags
    ]

    const child = _spawn("git", args)

    let stdout = []
    let stderr = []

    child
      .stdout
      .setEncoding("utf8")
      .on("data", handleOutputData(stdout, _Logger))

    child
      .stderr
      .setEncoding("utf8")
      .on("data", handleOutputData(stderr, _Logger))

    child
      .on("error", reject)

    child
      .on("close", onChildClose(resolve, reject, stdout, stderr))
  })

module.exports = execute
