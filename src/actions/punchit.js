const deploy = require("./deploy")

const OPTIONS = {
  environment: "production",
  marketplace: "all",
  reference: "master",
}

// Actions.punchit :: Void -> Promise<Git.Result>
const punchit = () => deploy(OPTIONS)

module.exports = punchit
