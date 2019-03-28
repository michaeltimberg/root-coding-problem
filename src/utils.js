const fileSystem = require(`fs`)
const readLine = require(`readline`)
const util = require(`util`)

const error = require(`./lib/error`)

const acceptInput = ({ commandLineArg, stdin, isTTY }) => {
  return commandLineArg
    ? acceptCommandLineArg(commandLineArg).then(report => report).catch(error => error)
    : !isTTY
      ? acceptStdIn(stdin).then(report => report).catch(error => error)
      : error.create(`No \`stdin\` or command line arg. given.`)
}

const acceptCommandLineArg = commandLineArg => {
  const readFileAsync = util.promisify(fileSystem.readFile)

  return readFileAsync(commandLineArg, `utf8`).catch(error => console.log(`Error`, error))
}

const acceptStdIn = stdin => {
  return new Promise(resolve => {
    const readLinesInterface = readLine.createInterface({ input: stdin })
    let report = ``

    readLinesInterface.on(`line`, line => { report += line + `\n` })
    readLinesInterface.on(`close`, () => resolve(report))
  })
}

module.exports.acceptInput = acceptInput
