function init (deps) {
  const { log } = deps
  return async function waitCall (message) {
    try {
      const {
        botClient: { comment },
        store: { text }
      } = deps
      const { teamId, data: {userId} } = message
      log('message type', message)
    } catch (error) {
      log('[ERROR WAIT CALL]:', error)
    }
  }
}

module.exports = init
