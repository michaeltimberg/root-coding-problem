const fileSystem = require(`fs`)
const readLine = require(`readline`)
const util = require(`util`)

const { check } = require(`./middleware`)
const { driver } = require(`./driver`)
const { error } = require(`./lib/error`)
const { trip } = require(`./trip`)

const acceptInput = ({ commandLineArg, stdin, isTTY }) => {
  return commandLineArg
    ? acceptCommandLineArg(commandLineArg).then(report => report).catch(error => error)
    : !isTTY
      ? acceptStdIn(stdin).then(report => report).catch(error => error)
      : error.promise(`No \`stdin\` or command line arg. given.`)
}

const acceptCommandLineArg = commandLineArg => {
  const readFileAsync = util.promisify(fileSystem.readFile)

  let [driverStore, tripStore] = initiateStore()

  return readFileAsync(commandLineArg, `utf8`)
    .then(data => data.trim().split(`\n`))
    .then(dataArray => dataArray.forEach(line => commandSelector(driverStore, tripStore, line)))
    .then(() => trip.report(driverStore, tripStore))
    .catch(error => console.log(`Error`, error))
}

const acceptStdIn = stdin => {
  let [driverStore, tripStore] = initiateStore()

  return new Promise(resolve => {
    const readLinesInterface = readLine.createInterface({ input: stdin })

    readLinesInterface.on(`line`, line => commandSelector(driverStore, tripStore, line))
    readLinesInterface.on(`close`, () => resolve(trip.report(driverStore, tripStore)))
  })
}

const initiateStore = () => [new Set(), []]

const commandSelector = (driverStore, tripStore, line) => {
  const lineArray = line.match(/\S+/g) || []

  if (!lineArray.length) return

  const command = lineArray.shift()
  const [driverName] = lineArray

  if ([`Driver`, `Trip`].indexOf(command) === -1) return error.log(`Command \`"${command}"\` not recognized.`)
  if (command === `Driver` && check.driver(lineArray)) return driver.register(driverStore, driverName)
  if (command === `Trip` && check.trip(lineArray)) {
    return driver.isRegistered(driverStore, driverName)
      ? trip.record(tripStore, lineArray)
      : error.log(`Driver \`"${driverName}"\` not registered.`)
  }
}

module.exports.acceptInput = acceptInput
