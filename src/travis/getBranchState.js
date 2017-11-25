import { readFileSync } from "fs"
import Future from "fluture"
import { compose, match, tail, path, join, flip, curry } from "ramda"
import travis from "./travis"

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

// getBranchState :: String -> Void -> Future Error String
const getBranchState = (branch) => () => Future((reject, resolve) => {
  travis
    .repos(owner, repo)
    .branches(branch)
    .get((error, response) => {
      return resolve((error) ? "unknown" : response.branch.state)
    })
})

export default getBranchState
