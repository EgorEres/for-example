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

| [comment](#io)    | [contact](#contact)               | [file](#file)           | [mail](#mail)                      | [status](#status)           | [stream](#stream)                          |[team](#team)                                           |[telephony](#telephony)              |[thread](#thread)                                 |
|---|---|---|---|---|---|---|---|
| [count](#io)      | [create](#contact-create)         | [getGETUrl](#getGETUrl) | [get-accounts](#mail-get-accounts) | [create](#status-create)    | [create](#stream-create)                   |[get-accesses](#team-get-accesses)                      |[create-user](#telephony-create-user)|[create](#thread-create)                          |
| [create](#io)     | [get-locale](#contact-get-locale) | [getPUTUrl](#getPUTUrl) | [on-received](#mail-on-received)   | [read](#status-read)        | [delete-user](#stream-delete-user)         |[invite-user](#team-invite-user)                        |[delete-user](#telephony-delete-user)|[on-budget-updated](#thread-on-budget-updated)    |
| [delete](#io)     | [read](#contact-read)             |                         | [on-sent](#mail-on-sent)           | [set-name](#status-set-name)| [delete](#stream-delete)                   |[on-admin-status-given](#team-on-admin-status-given)    |[get-user](#telephony-get-user)      |[on-created](#thread-on-created)                  |
| [on-created](#io) |                                   |                         | [read](#mail-read)                 |                             | [on-user-deleted](#stream-on-user-deleted) |[on-admin-status-revoked](#team-on-admin-status-revoked)|[update-user](#telephony-update-user)|[on-deadline-updated](#thread-on-deadline-updated)|
| [on-direct](#io)  |                                   |                         | [send](#mail-send)                 |                             | [on-user-set](#stream-on-user-set)         |[on-user-invited](#team-on-user-invited)                |                                     |[status-updated](#thread-status-updated)          |
| [on-echo](#io)    |                                   |                         |                                    |                             | [read](#stream-read)                       |[on-user-removed](#team-on-user-removed)                |                                     |[read-description](#thread-read-description)      |
| [on-mention](#io) |                                   |                         |                                    |                             | [set-admin](#stream-set-admin)             |[read](#team-read)                                      |                                     |[read](#thread-read)                              |
| [read](#io)       |                                   |                         |                                    |                             | [set-name](#stream-set-name)               |                                                        |                                     |[set-budget](#thread-set-budget)                  |
|                   |                                   |                         |                                    |                             | [set-user](#stream-set-user)               |                                                        |                                     |[set-deadline](#thread-set-deadline)              |
|                   |                                   |                         |                                    |                             |                                            |                                                        |                                     |[set-description](#thread-set-description)        |
|                   |                                   |                         |                                    |                             |                                            |                                                        |                                     |[set-priority](#thread-set-priority)              |
|                   |                                   |                         |                                    |                             |                                            |                                                        |                                     |[set-responsible](#thread-set-responsible)        |
|                   |                                   |                         |                                    |                             |                                            |                                                        |                                     |[set-status](#thread-set-status)                  |
|                   |                                   |                         |                                    |                             |                                            |                                                        |                                     |[set-stream](#thread-set-stream)                  |
|                   |                                   |                         |                                    |                             |                                            |                                                        |                                     |[set-title](#thread-set-title)                    |

