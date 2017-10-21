class GitError extends Error {
  constructor(result) {
    const message = `Something went wrong! (Code: ${result.code})`
    super(message)
    this.result = result
  }
}

module.exports = GitError
