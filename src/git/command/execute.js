import { trim, map, split } from "ramda"
import { spawn } from "child_process"
import { magenta } from "chalk"
import * as Logger from "../../logger"
import GitError from "../git-error"
import refspec from "./refspec"

// onChildClose :: Function, Function, Array<String>, Array<String> -> Number -> Git.Result
const onChildClose = (resolve, reject, stdout, stderr) => (code) => {
  const result = { code, stdout, stderr }
  if (code !== 0) return reject(new GitError(result))
  return resolve(result)
}

// handleOutputData :: Array<String>, Logger -> String -> Void
const handleOutputData = (repo, stdio, _Logger=Logger) => (data) => {
  const lines = split("\n")(trim(data))
  map((line) => _Logger.log(`${magenta.dim(repo)} ${line}`), lines)
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
      .on("data", handleOutputData(command.repository, stdout, _Logger))

    child
      .stderr
      .setEncoding("utf8")
      .on("data", handleOutputData(command.repository, stderr, _Logger))

    child
      .on("error", reject)

    child
      .on("close", onChildClose(resolve, reject, stdout, stderr))
  })

export default execute
