function init (deps) {
  const { log } = deps
  return function onUserInvited (message) {
    log(message)
  }
}

module.exports = init
