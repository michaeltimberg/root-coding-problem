const data = require(`./data`)
const { test } = require(`./utils/index`)

test.runner([
  { command: `node server.js ./test/inputPass.txt`, expected: data.expected[0] },
  { command: `cat ./test/inputPass.txt | node server.js`, expected: data.expected[0] }
])
