const create = message => new Promise(resolve => resolve(new Error(message).stack))

module.exports.create = create
