const data = require(`./data`)
const { test } = require(`./utils/index`)

test.runner([
  { command: `node server.js ./test/input.txt`, expected: { data: data.expected[0], pass: true } },
  { command: `cat ./test/input.txt | node server.js`, expected: { data: data.expected[0], pass: true } },
  { command: `node server.js ./test/inputPass.txt`, expected: { data: data.expected[1], pass: true } },
  { command: `cat ./test/inputPass.txt | node server.js`, expected: { data: data.expected[1], pass: true } },
  { command: `node server.js ./test/inputFail.txt`, expected: { data: data.expected[2], pass: false } },
  { command: `cat ./test/inputFail.txt | node server.js`, expected: { data: data.expected[2], pass: false } }
])
