const { execSync } = require("child_process")
const { trim, toString } = require("ramda")

// Deploy.Options.setDefaults :: Deploy.Options -> Promise<Deploy.Options>
const setDefaults = ({
  environment="staging",
  marketplace="grailed",
  reference=trim(toString(execSync("git rev-parse --abbrev-ref HEAD"))),
}) => Promise.resolve({
  environment,
  marketplace,
  reference,
})

module.exports = setDefaults
