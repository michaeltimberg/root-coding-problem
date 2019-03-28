const register = (driverStore, line) => driverStore.add(line.match(/\S+/g).pop())

module.exports.register = register
