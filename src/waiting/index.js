const waitMail = require('./wait-mail')
const waitLiveChat = require('./wait-live-chat')
const waitCall = require('./wait-call')

module.exports = function init (deps) {
  return {
    waitMail: waitMail(deps),
    waitLiveChat: waitLiveChat(deps),
    waitCall: waitCall(deps)
  }
}
