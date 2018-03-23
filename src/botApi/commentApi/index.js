const onDirect = require('./on-direct')
const onCreated = require('./on-created')
const onMention = require('./on-mention')

function init (deps) {
  return {
    onDirect: onDirect(deps),
    onCreated: onCreated(deps),
    onMention: onMention(deps)
  }
}

module.exports = init
