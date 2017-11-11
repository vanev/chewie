export default class BranchNotFoundError extends Error {
  constructor(branch) {
    super(`Branch, "${branch}", not found on Travis.`)
    this.branch = branch
  }
}
