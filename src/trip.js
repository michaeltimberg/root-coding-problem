const record = (tripStore, lineArray) => {
  const [name, start, end] = lineArray
  const miles = +lineArray[3]

  const hours = hourDifference(start, end)
  const mph = Math.round(miles / hours)

  if (mph > 5 && mph < 100) return tripStore.push({ name, hours, miles })
}

const hourDifference = (timeOne, timeTwo) => {
  const hoursStart = +timeOne.substring(0, 2) + +timeOne.substring(3, 5) / 60
  const hoursEnd = +timeTwo.substring(0, 2) + +timeTwo.substring(3, 5) / 60

  return hoursEnd - hoursStart
}

const report = (driverStore, tripStore) => {
  return tripStore
    .reduce((totals, event) => {
      const index = totals.findIndex(total => total[`name`] === event.name)

      totals[index][`miles`] += event.miles
      totals[index][`hours`] += event.hours

      return totals
    }, [...driverStore].map(name => ({ name, 'miles': 0, 'hours': 0 })))
    .sort((a, b) => (b.miles - a.miles))
    .reduce((output, driver) => {
      return output + `${driver.name}: ${Math.round(driver.miles)} miles` +
        `${driver.miles ? ` @ ${Math.round(driver.miles / driver.hours)} mph` : ``}\n`
    }, ``)
}

module.exports.trip = { record, report }
