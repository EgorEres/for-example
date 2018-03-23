function init (deps) {
  const { log } = deps
  return async function onUserDeleted (message) {
    try {
      const {
        mongo
      } = deps
      const { teamId, data: { streamId } } = message

      await mongo.removeStream(teamId, streamId)
      log('user delete stream by streamId:', streamId)
    } catch (error) {
      log('[ERROR ON USER DELETED]:', error)
    }
  }
}

module.exports = init
