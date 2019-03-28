const { error } = require(`./lib/error`)

const isRegistered = (driverStore, driver) => driverStore.has(driver)

const register = (driverStore, driver) => {
  return !isRegistered(driverStore, driver)
    ? driverStore.add(driver)
    : error.log(`\`"Driver"\` already registered!`)
}

module.exports.register = register
