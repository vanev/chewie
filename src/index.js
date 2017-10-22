const program = require("commander")
const { deploy } = require("./actions")

const main = () => {
  program.version("0.0.1")

  program
    .command("deploy")
    .description("Deploy the given reference from your computer to an application.")
    .option("-r, --reference <reference>")
    .option("-e, --environment <environment>")
    .option("-m, --marketplace <marketplace>")
    .action(deploy)

  program.parse(process.argv)
}

module.exports = main
