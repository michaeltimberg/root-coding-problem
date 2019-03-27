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
    .then(result => compare(result))
    .then(results => log(results))
    .catch(error => console.error(error))
})

const log = ({ command, expected, response, pass }) => console.log(`  ${command}: ${pass ? `✔` : `❌`}`)

module.exports.test = { runner }
