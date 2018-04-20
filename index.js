const botConnect = require('workonflow-bot-client')
// const LoadBalancer = require('./src/index')
// const waiting = require('./src/waiting')
// const botApi = require('./src/botApi')
// const store = require('./src/store')
// const mongo = require('./src/mongo')

const log = botConnect.log
// let deps = {}

const cred = {
  email: process.env.BOT_LOGIN || 'liyokatime@letsmail9.com',
  password: process.env.BOT_PASSWORD || 'liyokatime'
}

async function init () {
  const botClient = await botConnect.connect(cred)
  botClient.comment.onDirect(callback)
  // try {
  //   deps.collections = {}
  //   deps.log = log
  //   deps.mongo = await mongo(deps)
  //   deps.botApi = botApi(deps)
  //   deps.waiting = waiting(deps)
  //   deps.store = store(deps)

  //   LoadBalancer(deps)
  // } catch (error) {
  //   log('ERROR initial bot:', error)
  // }


async function callback (message) {
  if (message.data.content.att[0].data.text.toLowerCase === 'привет') {
    const teamId = message.teamId
    const userId = message.data.userId

    const query = {
      to: userId,
      att: [{type: 'text', data: {text: 'Привет, пользователь'}}]
    }
    botClient.comment.create(teamId, query)
  }

  //log('Incoming message', message)
  //log(message.data.content.att[0].data.text)
}
}

init()

// process.on('uncaughtException', err => {
//   log('[STACK ERR]', err.stack)
//   process.exit()
// })
