import Future from "fluture"
import { trim, map, split } from "ramda"
import { spawn } from "child_process"
import chalk from "chalk"
import * as Logger from "../../logger"
import GitError from "../git-error"
import refspec from "./refspec"

let dependencies = {
  spawn: spawn,
  Logger: Logger,
}
export const di = (newDependencies) => {
  dependencies = { ...dependencies, ...newDependencies }
}

const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const randomColor = () => chalk.rgb(random(0, 255), random(0, 255), random(0, 255))

// onChildClose :: Function, Function, Array<String>, Array<String> -> Number -> Git.Result
const onChildClose = (resolve, reject, stdout, stderr) => (code) => {
  const result = { code, stdout, stderr }
  if (code !== 0) return reject(new GitError(result))
  return resolve(result)
}

// handleOutputData :: Array<String>, Logger -> String -> Void
const handleOutputData = (repo, stdio, color) => (data) => {
  const lines = split("\n")(trim(data))
  map((line) => dependencies.Logger.log(`${color(repo)} ${line}`), lines)
  stdio.push(data)
}

// Git.Command.execute :: Git.Command -> Future Error Git.Result
const execute = (command) =>
  Future((reject, resolve) => {
    const args = [
      command.cmd,
      command.repository,
      refspec(command),
      ...command.flags
    ]

    const child = dependencies.spawn("git", args)

    let stdout = []
    let stderr = []

    const color = randomColor()

    child
      .stdout
      .setEncoding("utf8")
      .on("data", handleOutputData(command.repository, stdout, color))

    child
      .stderr
      .setEncoding("utf8")
      .on("data", handleOutputData(command.repository, stderr, color))

    child
      .on("error", reject)

    child
      .on("close", onChildClose(resolve, reject, stdout, stderr))
  })

export default execute
