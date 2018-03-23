const { keys } = require('ramda')
const { MongoClient } = require('mongodb')

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/botOmnideskTransfer'

module.exports = async deps => {
  const {log} = deps
  const mongo = await MongoClient.connect(url, {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE
  })
  log('Connect to mongo')
  const LoadSet = mongo.collection('LoadBalancerSettings')

  // LoadSet.drop()

  async function getAll (teamId) {
    const response = await LoadSet.findOne({ _id: teamId })
    return response
  }

  async function defSet (teamId) {
    const response = await LoadSet.insert({
      _id: teamId,
      streams: {}
    })
    log('[MONGO] create default settings', response.result)
    return response.ops
  }

  async function updateStreamRoles (teamId, streamId, roles) {
    const newRoles = {}
    roles.map(role => {
      newRoles[role] = {
        threadsInWork: []
      }
    })
    const response = await LoadSet.updateOne({ _id: teamId }, { $set: { [`streams.${streamId}.roles`]: newRoles } })
    log('[MONGO] update stream roles, modified count:', response.modifiedCount)
    return response.modifiedCount
  }

  async function removeStream (teamId, streamId) {
    const response = await LoadSet.updateOne({ _id: teamId }, { $unset: { [`streams.${streamId}`]: true } })
    return response.modifiedCount
  }

  async function addUserInRoles (teamId, streamId, userId) {
    const response = await LoadSet.updateOne({ _id: teamId }, { $set: { [`streams.${streamId}.roles.${userId}.threadsInWork`]: [] } })
    return response.modifiedCount
  }

  async function removeUserInRoles (teamId, streamId, userId) {
    const response = await LoadSet.updateOne({ _id: teamId }, { $unset: { [`streams.${streamId}.roles.${userId}`]: true } })
    return response.modifiedCount
  }

  async function updateUserThreadsInWork (teamId, streamId, userId, newThreadsList) {
    const response = await LoadSet.updateOne({ _id: teamId }, { $set: { [`streams.${streamId}.roles.${userId}.threadsInWork`]: newThreadsList } })
    log('[MONGO] update user conut, response modified: ', response.modifiedCount)
    return response.modifiedCount
  }

  async function dropWeight () {
    const collectionList = await LoadSet.find({}).toArray()
    collectionList.map(elem => {
      const teamId = elem._id
      const streams = elem.streams
      keys(streams).map(streamId => {
        const roles = streams[streamId].roles
        keys(roles).map(userId => updateUserThreadsInWork(teamId, streamId, userId, []))
      })
    })
    log('drop weight add users')
  }

  return {
    updateUserThreadsInWork,
    updateStreamRoles,
    removeUserInRoles,
    addUserInRoles,
    removeStream,
    dropWeight,
    getAll,
    defSet
  }
}
