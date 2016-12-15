function parseStringToFloat(stringValue) {
  return parseFloat(stringValue.replace(',', ''))
}

module.exports = parseStringToFloat;