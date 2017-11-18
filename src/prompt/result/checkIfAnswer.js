import { compose, contains, not } from "ramda"

const excludes = compose(not, contains)

// Prompt.Result.checkIfAnswer :: Array String -> Prompt.Result -> Prompt.Result
const checkIfAnswer = (answers) => (result) => {
  if (excludes(result.response, answers)) {
    const error = new Error("That's okay, I'll be here if you need me!")
    throw error
  }
  return result
}

export default checkIfAnswer
