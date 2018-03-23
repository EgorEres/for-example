const onStatusUpdated = require('./on-status-updated')

function init (deps) {
  return {
    onStatusUpdated: onStatusUpdated(deps)
  }
}

module.exports = init
