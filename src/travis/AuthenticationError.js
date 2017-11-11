export default class AuthenticationError extends Error {
  constructor(error) {
    super()
    this.message = error
  }
}
