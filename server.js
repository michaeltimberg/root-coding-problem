const utils = require(`./src/utils`)

utils
  .acceptInput({ 'commandLineArg': process.argv[2], 'stdin': process.stdin, 'isTTY': process.stdin.isTTY })
  .then(report => process.stdout.write(report))
  .catch(error => console.error(error))
