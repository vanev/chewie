const program = require("commander")
const { deploy, punchit } = require("./actions")

const main = () => {
  program.version("0.0.1")

  program
    .command("deploy")
    .description("Deploy the given reference from your computer to an application.")
    .option("-r, --reference <reference>")
    .option("-e, --environment <environment>")
    .option("-m, --marketplace <marketplace>")
    .action(deploy)

  program
    .command("punchit")
    .description("Deploy master to production for all marketplaces.")
    .action(punchit)

  program.parse(process.argv)
}

module.exports = main
