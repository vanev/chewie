const { map } = require("ramda")
const execute = require("./execute")

// Git.Command.executeAll :: [Git.Command] -> Promise<[Git.Result]>
const executeAll = (commands) => Promise.all(map(execute)(commands))

module.exports = executeAll
