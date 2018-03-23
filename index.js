const botConnect = require('workonflow-bot-client')
const LoadBalancer = require('./src/index')
const waiting = require('./src/waiting')
const botApi = require('./src/botApi')
const store = require('./src/store')
const mongo = require('./src/mongo')

const log = botConnect.log
let deps = {}

const cred = {
  email: process.env.BOT_LOGIN, // || 'liyokatime@letsmail9.com',
  password: process.env.BOT_PASSWORD // || 'liyokatime'
}

async function init () {
  try {
    deps.collections = {}
    deps.log = log
    deps.botClient = await botConnect.connect(cred)
    deps.mongo = await mongo(deps)
    deps.botApi = botApi(deps)
    deps.waiting = waiting(deps)
    deps.store = store(deps)

    LoadBalancer(deps)
  } catch (error) {
    log('ERROR initial bot:', error)
  }
}

init()

process.on('uncaughtException', err => {
  log('[STACK ERR]', err.stack)
  process.exit()
})
