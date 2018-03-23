const commentApi = require('./commentApi')
const streamApi = require('./streamApi')
const teamApi = require('./teamApi')
const threadApi = require('./threadApi')

function init (deps) {
  return {
    commentApi: commentApi(deps),
    streamApi: streamApi(deps),
    teamApi: teamApi(deps),
    threadApi: threadApi(deps)
  }
}

module.exports = init
