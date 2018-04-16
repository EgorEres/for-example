## workonflow-bot-client ##

### How to use ###
```js
const botClient = require('bot-client')

const creds = {
  email: <you email>,
  password: <you password>
}

const { comment } = botClient.connect(creds)

comment.onDirect(async message => {
  console.log('ON_DIRECT', message)
  const { teamId } = message
  const to = message.data.content.from

  const att = [{ type: 'text', data: { text: "text for response" } }]
  const resp = await comment.create(teamId, { to, att })
  console.log('resp', resp)
})
```

