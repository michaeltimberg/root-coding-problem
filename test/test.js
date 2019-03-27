const data = require(`./data`)
const { test } = require(`./utils/index`)

test.runner([
  { command: `node server.js test/input.txt`, expected: data.expected[0] },
  { command: `cat test/input.txt | node server.js`, expected: data.expected[0] }
])
