import deploy from "./deploy"

const OPTIONS = {
  environment: "production",
  marketplace: "all",
  reference: "master",
}

// Actions.punchit :: Void -> Promise<Git.Result>
const punchit = () => deploy(OPTIONS)

export default punchit
