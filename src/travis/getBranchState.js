// @flow

import { readFileSync } from "fs"
import { compose, match, tail, path, join, flip, curry } from "ramda"
import travis from "./travis"
import Travis from "travis-ci"
import BranchNotFoundError from "./BranchNotFoundError"

const partialReadFileSync = curry(flip(readFileSync))

const matchGithub = match(/^(?:https?)?(?::\/\/)?(?:www\.)?(?:github\.com\/)?(.*)\/(.*[^.git])(?:\.git)?$/)

const [ owner, repo ] = compose(
  tail,
  matchGithub,
  path(["repository", "url"]),
  JSON.parse,
  partialReadFileSync({ encoding: "utf8" }),
  join("/")
)([process.cwd(), "package.json"])

const getBranchState: string => Travis => Promise<string>
= (branch) => (_travis=travis) => new Promise((resolve, reject) => {
  _travis
    .repos(owner, repo)
    .branches(branch)
    .get((error, response) => {
      if (error) return reject(new BranchNotFoundError(branch))
      return resolve(response.branch.state)
    })
})

export default getBranchState
