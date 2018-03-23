const { path, keys, uniq } = require('ramda')

function init (deps) {
  const { log } = deps
  return async function onCreated (message) {
    try {
      const {
        mongo,
        botClient: { thread, status }
      } = deps
      const { teamId, data: { content } } = message
      const { streamId } = content
      // log(content.type)
      const getAll = await mongo.getAll(teamId)
      if (getAll && getAll.streams[streamId]) {
        switch (content.type) {
          case 'mail':
          case 'livechat':
          case 'call':
            const { teamId, data: { content } } = message
            const { threadId, streamId } = content
            const getAll = await mongo.getAll(teamId)
            if (!path(['streams', streamId, 'roles'], getAll)) {
              log('[WAIT MAIL] roles not found by streamId:', streamId)
              return
            }
            let threadsList = []
            const getThread = await thread.read(teamId, {id: threadId})
            const getStatus = await status.read(teamId, {id: getThread.data[0].status})
            if (getStatus.data[0] && getStatus.data[0].type === 'Done') return
            if (path(['data', '0', 'responsibleUserId'], getThread)) {
              const responsibleUserId = getThread.data[0].responsibleUserId
              if (path(['streams', streamId, 'roles', responsibleUserId], getAll)) {
                log('find resp id in mongo')
                threadsList = getAll.streams[streamId].roles[responsibleUserId].threadsInWork
                threadsList.push(threadId)
                await mongo.updateUserThreadsInWork(teamId, streamId, responsibleUserId, [threadId])
                return
              }
            }
            const arrRolesIds = keys(getAll.streams[streamId].roles)
            arrRolesIds.sort((a, b) => {
              return getAll.streams[streamId].roles[a].threadsInWork.length - getAll.streams[streamId].roles[b].threadsInWork.length
            })

            const UserId = arrRolesIds[0]
            threadsList = getAll.streams[streamId].roles[UserId].threadsInWork
            threadsList.push(threadId)

            await mongo.updateUserThreadsInWork(teamId, streamId, UserId, uniq(threadsList))
            await thread.setResponsible(teamId, { id: threadId, userId: UserId })
            log('[ON CREATED COMMETN] update responsible user and update weght, streamId:', streamId, 'threadId:', threadId, 'And weght:', threadsList.length)
            return
          default: return
        }
      }
    } catch (error) {
      log('[ERROR ON_CREATED]:', error)
    }
  }
}

module.exports = init
