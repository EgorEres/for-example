## workonflow-bot-client ##

```js
npm install workonflow-bot-client
```

### How to use ###
```js
const botClient = require('workonflow-bot-client')

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

### Table of Contents ###

| [comment](#io) | [contact](#contact) | [file](#file) |
|---|---|---|
| [count](#io) | [create](#contact-create) | [getGETUrl](#getGETUrl) |
| [create](#io) | [get-locale](#contact-get-locale) | [getPUTUrl](#getPUTUrl) |
| [delete](#io) | [read](#contact-read) |
| [on-created](#io) | |
| [on-direct](#io) | |
| [on-echo](#io) | |
| [on-mention](#io) | |
| [read](#io) | |
