const { error } = require(`./lib/error`)

const driver = lineArray => {
  if (lineArray.length === 0) return error.log(`No \`"Driver"\` name given!`)
  if (lineArray.length > 1) return error.log(`Bad format for \`"Driver"\` command.`)

  return true
}

const trip = lineArray => {
  if (lineArray.length !== 4) return error.log(`Bad format for \`"Trip"\` command.`)

  const [start, end, miles] = lineArray.slice(1, 4)
  const regexp = /^([0-9]{2})(:{1})([0-9]{2})$/

  if (!regexp.test(start) || !regexp.test(end)) return error.log(`Bad time format for \`"Trip"\` command.`)
  if (isNaN(miles)) return error.log(`Bad miles format for \`"Trip"\` command.`)

  return true
}

module.exports.check = { driver, trip }
