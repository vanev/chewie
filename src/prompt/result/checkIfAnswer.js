const { compose, contains, not } = require("ramda")
const excludes = compose(not, contains)

// Prompt.Result.checkIfAnswer :: Array<String> -> Prompt.Result -> Promise<Prompt.Result>
const checkIfAnswer = (answers) => (result) => {
  if (excludes(result.response, answers)) {
    const error = new Error("That's okay, I'll be here if you need me!")
    return Promise.reject(error)
  }
  return Promise.resolve(result)
}

module.exports = checkIfAnswer
