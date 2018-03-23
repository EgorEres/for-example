const { path, keys } = require('ramda')

function init (deps) {
  const { log } = deps
  return async function waitMail (message) {
    try {
      const {
        botClient: { thread },
        // store: { text },
        mongo
      } = deps
      const { teamId, data: { content } } = message
      const { threadId, streamId } = content
      const getAll = await mongo.getAll(teamId)
      if (!path(['streams', streamId, 'roles'], getAll)) {
        log('[WAIT MAIL] roles not found by streamId:', streamId)
        return
      }
      const arrRolesIds = keys(getAll.streams[streamId].roles)
      arrRolesIds.sort((a, b) => {
        return getAll.streams[streamId].roles[a].threadsInWork.length - getAll.streams[streamId].roles[b].threadsInWork.length
      })

      const responsibleUser = arrRolesIds[0]
      const threadsList = getAll.streams[streamId].roles[responsibleUser].threadsInWork
      threadsList.push(threadId)

      await mongo.updateUserThreadsInWork(teamId, streamId, responsibleUser, threadsList)
      await thread.setResponsible(teamId, { id: threadId, userId: responsibleUser })
      log('[WAIT MAIL] update responsible user and update weght, streamId:', streamId, 'threadId:', threadId, 'And weght:', threadsList.length)
    } catch (error) {
      log('[ERROR WAIT MAIL]:', error)
    }
  }
}

module.exports = init
