const onUserDeleted = require('./on-user-deleted')
const onUserSet = require('./on-user-set')

function init (deps) {
  return {
    onUserDeleted: onUserDeleted(deps),
    onUserSet: onUserSet(deps)
  }
}

module.exports = init
