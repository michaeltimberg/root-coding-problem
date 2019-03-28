const { error } = require(`./lib/error`)

const driver = lineArray => {
  if (lineArray.length === 0) return error.log(`No \`"Driver"\` name given!`)
  if (lineArray.length > 1) return error.log(`Bad format for \`"Driver"\` command.`)

  return true
}

module.exports.check = { driver }
