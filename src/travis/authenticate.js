import Future from "fluture"
import travis from "./travis"

const authConfig = { github_token: process.env.CHEWIE_TRAVIS_GITHUB_TOKEN }

// authenticate :: Void => Future Error Void
const authenticate = () => Future.node((done) => {
  travis.authenticate(authConfig, done)
})

export default authenticate
