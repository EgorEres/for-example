function init (deps) {
  const { log } = deps
  return async function onDirect (message) {
    try {
      const {
        botClient: { comment },
        store: { text }
      } = deps
      const { teamId, data: {userId} } = message
      await comment.create(teamId, {
        att: [{type: 'text', data: { text: text.hello }}],
        to: [userId]
      })
    } catch (error) {
      log('[ERROR ON_DIRECT]:', error)
    }
  }
}

module.exports = init
