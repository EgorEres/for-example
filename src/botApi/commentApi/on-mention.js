const { path, uniq, keys } = require('ramda')

function init (deps) {
  return async function onMention (message) {
    const {
      log
    } = deps
    try {
      const {
        botClient: { comment, stream },
        mongo,
        store: { text }
      } = deps
      const { teamId, data } = message
      const streamId = data.content.streamId
      if (!path([ 'content', 'att', '0', 'data', 'text' ], data)) {
        log('[ON_MENTION] message without text')
        await comment.create(teamId, {
          att: [{type: 'text', data: { text: `@${data.userId}@ ${text.reject}` }}],
          streamId,
          to: [data.userId]
        })
        return
      }
      const getAll = await mongo.getAll(teamId)
      if (!path(['streams', streamId], getAll)) {
        log('[WAIT MAIL] roles not found by streamId:', streamId)
        await comment.create(teamId, {
          att: [{type: 'text', data: { text: `@${data.userId}@ ${text.hello}` }}],
          streamId,
          to: [data.userId]
        })
        return
      }

      const textMessage = data.content.att[0].data.text
      log('text message for mention:', textMessage)
      if (textMessage.toLowerCase().match(/статус|status/)) {
        const getRoles = getAll.streams[streamId].roles
        let respMessage = ''
        keys(getRoles).map(id => {
          if (getAll.streams[streamId].roles[id]) {
            respMessage = respMessage + `@${id}@ ${getAll.streams[streamId].roles[id].threadsInWork.length}\n`
          }
        })
        await comment.create(teamId, {
          att: [{type: 'text', data: { text: `${respMessage}` }}],
          streamId,
          to: [data.userId]
        })
        return
      }

      if (textMessage.toLowerCase().match(/@\w{24}@ *[1]/)) {
        const userId = textMessage.split('@')[1]
        const resStream = await stream.read(teamId, {id: streamId})
        if (!resStream) {
          log('[ON_USER_SET] stream not found, streamId:', streamId)
          return
        }
        const { roles, admins } = resStream.data[0]
        const allRoles = uniq(roles.concat(admins))
        if (!allRoles.find(elem => elem === userId)) {
          await comment.create(teamId, {
            att: [{type: 'text', data: { text: `@${data.userId}@ Пользователя нет в фоловерах стрима` }}],
            streamId,
            to: [data.userId]
          })
          return
        }
        await mongo.addUserInRoles(teamId, streamId, userId)
        await comment.create(teamId, {
          att: [{type: 'text', data: { text: `@${data.userId}@ ${text.success}` }}],
          streamId,
          to: [data.userId]
        })
        return
      }

      if (textMessage.toLowerCase().match(/@\w{24}@ *[0]/)) {
        const userId = textMessage.split('@')[1]
        await mongo.removeUserInRoles(teamId, streamId, userId)
        await comment.create(teamId, {
          att: [{type: 'text', data: { text: `@${data.userId}@ ${text.success}` }}],
          streamId,
          to: [data.userId]
        })
        return
      }

      await comment.create(teamId, {
        att: [{type: 'text', data: { text: `@${data.userId}@ ${text.updateUsers}` }}],
        streamId,
        to: [data.userId]
      })
    } catch (error) {
      log('[ON_CREATED] Error:', error)
    }
  }
}
module.exports = init
