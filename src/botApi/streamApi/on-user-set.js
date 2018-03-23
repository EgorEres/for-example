const { uniq } = require('ramda')

function init (deps) {
  const { log } = deps
  return async function onUserSet (message) {
    try {
      const {
        botClient: { comment, stream, contact },
        store: { text },
        mongo
      } = deps
      const { teamId, data: { userId, streamId } } = message

      let mongoData = await mongo.getAll(teamId)
      if (!mongoData) {
        log('[ON_USER_SET] nothing not found by teamId in mongo:', teamId)
        log('[ON_USER_SET] create default settings')
        await mongo.defSet(teamId)
        mongoData = await mongo.getAll(teamId)
      }

      const resStream = await stream.read(teamId, {id: streamId})
      if (!resStream) {
        log('[ON_USER_SET] stream not found, streamId:', streamId)
        return
      }
      const { roles, admins } = resStream.data[0]

      const getUsers = await contact.read(teamId, { ids: uniq(roles.concat(admins)), billingType: 'users' })
      let allRoles = []
      if (getUsers.data && getUsers.data[0]) {
        allRoles = getUsers.data.map(elem => {
          return elem._id
        })
      }

      let mentionList = ''
      await mongo.updateStreamRoles(teamId, streamId, allRoles)
      allRoles.map(elem => {
        mentionList = mentionList + `@${elem}@ `
      })
      await comment.create(teamId, {
        att: [{type: 'text', data: { text: `@${userId}@, ${text.beginWork}\n${mentionList}\n${text.updateUsers}` }}],
        streamId,
        to: [userId]
      })
      log('user set in stream, streamId:', streamId)
    } catch (error) {
      log('[ERROR ON USER SET]:', error)
    }
  }
}

module.exports = init
