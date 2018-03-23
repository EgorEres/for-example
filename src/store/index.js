const text = require('./i18')

module.exports = function init (deps) {
  return {
    context: {},
    text: text(deps.locale)
  }
}
