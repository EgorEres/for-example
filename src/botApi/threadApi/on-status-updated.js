const { path } = require('ramda')

function init (deps) {
  const { log } = deps
  return async function onStatusUpdated (message) {
    try {
      const {
        botClient: { thread, status },
        mongo
      } = deps

      const { teamId, data } = message
      const { streamId, threadId, metadata: {statusId} } = data

      const getStatus = await status.read(teamId, {id: statusId})
      if (!getStatus.data) return
      if (getStatus.data[0] && getStatus.data[0].type === 'Done') {
        const getThread = await thread.read(teamId, {id: threadId})
        if (!path(['data', '0', 'responsibleUserId'], getThread)) return
        const responsibleUserId = getThread.data[0].responsibleUserId
        const getAll = await mongo.getAll(teamId)
        if (!path(['streams', streamId, 'roles', responsibleUserId], getAll)) {
          log('[WAIT MAIL] roles not found for userId:', responsibleUserId)
          return
        }

        const threadsList = getAll.streams[streamId].roles[responsibleUserId].threadsList
        const newThreadsList = threadsList.filter(elem => elem !== threadId)

        await mongo.updateUserThreadsInWork(teamId, streamId, responsibleUserId, newThreadsList)
        await thread.setResponsible(teamId, { id: threadId, userId: responsibleUserId })
        log('[WAIT MAIL] update responsible user and update weght, streamId:', streamId, 'threadId:', threadId, 'And weght:', threadsList.length)
      }
    } catch (error) {
      log('[ERROR WAIT MAIL]:', error)
    }
  }
}

module.exports = init
