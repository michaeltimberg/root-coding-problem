const promise = message => new Promise(resolve => resolve(new Error(message).stack))

const log = message => console.log(new Error(message).stack)

module.exports.error = { log, promise }
