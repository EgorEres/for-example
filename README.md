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

| [comment](#io)    | [contact](#contact)               |[status](#status)           | [stream](#stream)                          |[team](#team)                                           |<td colspan=2>[thread](#thread)                   |
|---|---|---|---|---|---|---|
| [count](#io)      | [create](#contact-create)         |[create](#status-create)    | [create](#stream-create)                   |[get-accesses](#team-get-accesses)                      |[create](#thread-create)                          ||
| [create](#io)     | [get-locale](#contact-get-locale) |[read](#status-read)        | [delete-user](#stream-delete-user)         |[invite-user](#team-invite-user)                        |[on-budget-updated](#thread-on-budget-updated)    ||
| [delete](#io)     | [read](#contact-read)             |[set-name](#status-set-name)| [delete](#stream-delete)                   |[on-admin-status-given](#team-on-admin-status-given)    |[on-created](#thread-on-created)                  ||
| [on-created](#io) |                                   |                            | [on-user-deleted](#stream-on-user-deleted) |[on-admin-status-revoked](#team-on-admin-status-revoked)|[on-deadline-updated](#thread-on-deadline-updated)||
| [on-direct](#io)  |                                   |                            | [on-user-set](#stream-on-user-set)         |[on-user-invited](#team-on-user-invited)                |[status-updated](#thread-status-updated)          ||
| [on-echo](#io)    |                                   |                            | [read](#stream-read)                       |[on-user-removed](#team-on-user-removed)                |[read-description](#thread-read-description)      ||
| [on-mention](#io) |                                   |                            | [set-admin](#stream-set-admin)             |[read](#team-read)                                      |[read](#thread-read)                              ||
| [read](#io)       |                                   |                            | [set-name](#stream-set-name)               |                                                        |[set-budget](#thread-set-budget)                  ||
|                   |                                   |                            | [set-user](#stream-set-user)               |                                                        |[set-deadline](#thread-set-deadline)              ||
|                   |                                   |                            |                                            |                                                        |[set-description](#thread-set-description)        ||
|                   |                                   |                            |                                            |                                                        |[set-priority](#thread-set-priority)              ||
|                   |                                   |                            |                                            |                                                        |[set-responsible](#thread-set-responsible)        ||
|                   |                                   |                            |                                            |                                                        |[set-status](#thread-set-status)                  ||
|                   |                                   |                            |                                            |                                                        |[set-stream](#thread-set-stream)                  ||
|                   |                                   |                            |                                            |                                                        |[set-title](#thread-set-title)                    ||

| [file](#file)           |[mail](#mail)                      |[telephony](#telephony)              |
|---|---|---|
| [getGETUrl](#getGETUrl) |[get-accounts](#mail-get-accounts) |[create-user](#telephony-create-user)|
| [getPUTUrl](#getPUTUrl) |[on-received](#mail-on-received)   |[delete-user](#telephony-delete-user)|
|                         |[on-sent](#mail-on-sent)           |[get-user](#telephony-get-user)      |
|                         |[read](#mail-read)                 |[update-user](#telephony-update-user)|
|                         |[send](#mail-send)                 |                                     |
