const report = (driverStore) => {
  return [...driverStore]
    .map(name => `${name}: 0 miles\n`)
    .reduce((report, line) => report + line, ``)
}

module.exports.report = report
