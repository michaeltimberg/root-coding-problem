const expected = [
  `Alex: 42 miles @ 34 mph\n` +
  `Dan: 39 miles @ 47 mph\n` +
  `Bob: 0 miles\n`,
  //
  `Alex: 335 miles @ 56 mph\n` +
  `Dan: 264 miles @ 58 mph\n`,
  //
  `Error: No \`"Driver"\` name given!\n` +
  `Error: Bad format for \`"Driver"\` command.\n` +
  `Error: \`"Driver"\` already registered!\n` +
  `Error: Bad format for \`"Trip"\` command.\n` +
  `Error: Bad format for \`"Trip"\` command.\n` +
  `Error: Bad time format for \`"Trip"\` command.\n` +
  `Error: Bad time format for \`"Trip"\` command.\n` +
  `Error: Bad time format for \`"Trip"\` command.\n` +
  `Error: Bad time format for \`"Trip"\` command.\n` +
  `Error: Bad miles format for \`"Trip"\` command.\n` +
  `Error: Driver \`"Alex"\` not registered.\n` +
  `Error: Command \`"Remove"\` not recognized.\n` +
  `Bob: 0 miles\n\n`
]

module.exports.expected = expected
