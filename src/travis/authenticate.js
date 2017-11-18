import { Future } from "ramda-fantasy"
import travis from "./travis"
import AuthenticationError from "./AuthenticationError"

const authConfig = { github_token: process.env.CHEWIE_TRAVIS_GITHUB_TOKEN }

// authenticate :: Void => Future Error Void
const authenticate = () => Future((reject, resolve) => {
  travis.authenticate(authConfig, (error, response) => {
    if (error) return reject(new AuthenticationError(error))
    return resolve(response)
  })
})

export default authenticate
