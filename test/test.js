const { spawn } = require(`child_process`)

const config = require(`../src/configuration/config`)

const test = command => {
  let response = ``

  const child = spawn(config.shell, [`-c`, command])

  child.on(`Error`, error => console.error(error.toString))
  child.stdout.on(`data`, data => { response += data.toString() })
  child.stderr.on(`data`, error => console.error(error.toString()))
  child.on(`close`, () => console.log(response))
}

test(`node server.js`)
