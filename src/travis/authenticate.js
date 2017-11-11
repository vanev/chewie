import travis from "./travis"
import AuthenticationError from "./AuthenticationError"

const authConfig = { github_token: process.env.CHEWIE_TRAVIS_GITHUB_TOKEN }

const authenticate = (_travis=travis) => new Promise((resolve, reject) => {
  _travis.authenticate(authConfig, (error) => {
    if (error) return reject(new AuthenticationError(error))
    return resolve()
  })
})

export default authenticate
