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

| #### [comment](#io) |   |   |   |   |
|---|---|---|---|---|
| [count](#io) |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |

#### [comment](#io)
  - [count](#io)
  - [create](#io)
  - [delete](#io)
  - [on-created](#io)
  - [on-direct](#io)
  - [on-echo](#io)
  - [on-mention](#io)
  - [read](#io)
#### [contact](#contact)
  - [create](#contact-create)
  - [get-locale](#contact-get-locale)
  - [read](#contact-read)
#### [file](#file)
  - [getGETUrl](#getGETUrl)
  - [getPUTUrl](#getPUTUrl)
#### [mail](#mail)
  - [get-accounts](#mail-get-accounts)
  - [on-received](#mail-on-received)
  - [on-sent](#mail-on-sent)
  - [read](#mail-read)
  - [send](#mail-send)
#### [notification](#notification)
  - [on-read](#notification-on-read)
#### [status](#status)
  - [create](#status-create)
  - [read](#status-read)
  - [set-name](#status-set-name)
#### [stream](#stream)
  - [create](#stream-create)
