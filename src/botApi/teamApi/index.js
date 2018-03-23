const onUserInvited = require('./on-user-invited')
const onUserRemoved = require('./on-user-removed')

function init (deps) {
  return {
    onUserInvited: onUserInvited(deps),
    onUserRemoved: onUserRemoved(deps)
  }
}

module.exports = init
