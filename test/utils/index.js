const { spawn } = require(`child_process`)

const { compare } = require(`./compare`)
const config = require(`../../src/configuration/config`)

const run = ({ command, expected }) => {
  return new Promise(resolve => {
    let response = ``

    const child = spawn(config.shell, [`-c`, command])

    child.on(`Error`, error => console.error(error.toString))
    child.stdout.on(`data`, data => { response += data.toString() })
    child.stderr.on(`data`, error => console.error(error.toString()))
    child.on(`close`, () => resolve(() => { return { command, expected, response } }))
  })
}

const runner = tests => tests.forEach(test => {
  return run(test)
    .then(resolve => resolve())
    .then(result => compare(result.expected.pass ? result : format(result)))
    .then(results => log(results))
    .catch(error => console.error(error))
})

const format = ({ command, expected, response }) => {
  response = response.split(`\n`).reduce((response, line) => /^\s/.test(line) ? response : response + line + `\n`, ``)

  return ({ command, expected, response })
}

const log = ({ command, expected, response, pass }) => {
  console.log(`  ${command}: ${pass ? `✔` : `❌`}`)

  if (!pass) return logHelper({ expected, response })
}

const logHelper = ({ expected, response }) => {
  const [expectedSplit, responseSplit] = [expected.data.split(`\n`), response.split(`\n`)]
  const indent = expectedSplit.reduce((indent, line) => line.length > indent ? line.length : indent, 0)

  console.log(`    Expected:${` `.repeat(indent - 7)}Actual:`)

  expectedSplit.forEach(line => {
    console.log(`   `, line, ` `.repeat(indent - line.length), responseSplit.shift())
  })
}

module.exports.test = { runner }
