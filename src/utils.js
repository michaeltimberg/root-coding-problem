const fileSystem = require(`fs`)
const readLine = require(`readline`)
const util = require(`util`)

const { check } = require(`./middleware`)
const driver = require(`./driver`)
const { error } = require(`./lib/error`)
const { report } = require(`./report`)

const acceptInput = ({ commandLineArg, stdin, isTTY }) => {
  return commandLineArg
    ? acceptCommandLineArg(commandLineArg).then(report => report).catch(error => error)
    : !isTTY
      ? acceptStdIn(stdin).then(report => report).catch(error => error)
      : error.promise(`No \`stdin\` or command line arg. given.`)
}

const acceptCommandLineArg = commandLineArg => {
  let driverStore = initiateStore()

  const readFileAsync = util.promisify(fileSystem.readFile)

  return readFileAsync(commandLineArg, `utf8`)
    .then(data => data.trim().split(`\n`).forEach(line => process(driverStore, line)))
    .then(() => report(driverStore))
    .catch(error => console.log(`Error`, error))
}

const acceptStdIn = stdin => {
  let driverStore = initiateStore()

  return new Promise(resolve => {
    const readLinesInterface = readLine.createInterface({ input: stdin })

    readLinesInterface.on(`line`, line => process(driverStore, line))
    readLinesInterface.on(`close`, () => resolve(report(driverStore)))
  })
}

const initiateStore = () => new Set()

const process = (driverStore, line) => {
  const lineArray = line.match(/\S+/g).slice(1)
  const [driverName] = lineArray

  if (check.driver(lineArray)) driver.register(driverStore, driverName)
}

module.exports.acceptInput = acceptInput
