const data = require(`./data`)
const { test } = require(`./utils/index`)

test.runner([
  { command: `echo Hello world!`, expected: data.expected[0] },
  { command: `node server.js`, expected: data.expected[0] }
])
