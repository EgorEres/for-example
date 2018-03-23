const textRu = require('./textRu')
const textUs = require('./textUs')

module.exports = locale => {
  if (locale === 'ru') {
    return textRu
  }
  return textUs
}
