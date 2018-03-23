function init (deps) {
  const { log } = deps
  return function onUserRemoved (message) {
    log(message)
  }
}

module.exports = init
