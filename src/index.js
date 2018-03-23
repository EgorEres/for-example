const { CronJob } = require('cron')

function init (deps) {
  const { log } = deps
  try {
    const {
      botClient: {stream, team, comment, thread},
      botApi: {streamApi, teamApi, commentApi, threadApi},
      mongo
    } = deps

    const job = new CronJob('00 00 04 * * *', () => mongo.dropWigth())
    job.start()
    log('cron job status', job.running)
    team.onUserInvited({self: true}, teamApi.onUserInvited)
    team.onUserRemoved({self: true}, teamApi.onUserRemoved)

    stream.onUserSet({self: true}, streamApi.onUserSet)
    stream.onUserDeleted({self: true}, streamApi.onUserDeleted)

    thread.onStatusUpdated(threadApi.onStatusUpdated)

    comment.onCreated(commentApi.onCreated)
    comment.onDirect(commentApi.onDirect)
    comment.onMention(commentApi.onMention)
  } catch (error) {
    log('Error init', error)
  }
}

module.exports = init
