const execute = require("./execute")
const executeAll = require("./executeAll")
const refspec = require("./refspec")
const toString = require("./toString")

// Git.Command :: {
//   cmd: String,
//   repository: String,
//   src: String,
//   dst: String,
//   flags: Array<String>,
// }

module.exports = {
  refspec,
  execute,
  executeAll,
  toString,
}
