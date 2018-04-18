## workonflow-bot-client ##

```js
$ npm install workonflow-bot-client

const botConnect = require('workonflow-bot-client').connect

const creds = {
  email: <you email>,
  password: <you password>
}

const botClient = botConnect(creds)
```

### How to use ###

```js
const botClient = botConnect(creds)

const { comment } = botClient

comment.onDirect(async message => {
  console.log('ON_DIRECT', message)
  const { teamId } = message
  const to = message.data.content.from

  const att = [{ type: 'text', data: { text: "text for response" } }]
  const resp = await comment.create(teamId, { to, att })
  console.log('resp', resp)
})
```

|[comment](#comment)                           |[contact](#contact)                           |[status](#status)                        |[stream](#stream)                                    |[team](#team)                                                     |[thread](#thread)                                              |
|---|---|---|---|---|---|
|[count](#user-content-comment-conunt)         |[create](#user-content-contact-create)        |[create](#user-content-status-create)    |[create](#user-content-stream-create)                |[getAccesses](#user-content-team-get-accesses)                    |[create](#user-content-thread-create)                          |
|[create](#user-content-comment-create)        |[getLocale](#user-content-contact-get-locale) |[read](#user-content-status-read)        |[deleteUser](#user-content-stream-delete-user)       |[inviteUser](#user-content-team-invite-user)                      |[onBudgetUpdated](#user-content-thread-on-budget-updated)    |
|[delete](#user-content-comment-delete)        |[read](#user-content-contact-read)            |[setName](#user-content-status-set-name) |[delete](#user-content-stream-delete)                |[onAdminStatusGiven](#user-content-team-on-admin-status-given)    |[onCreated](#user-content-thread-on-created)                  |
|[onCreated](#user-content-comment-on-created) |                                              |                                         |[onUserDeleted](#user-content-stream-on-user-deleted)|[onAdminStatusRevoked](#user-content-team-on-admin-status-revoked)|[onDeadlineUpdated](#user-content-thread-on-deadline-updated)|
|[onDirect](#user-content-comment-on-direct)   |                                              |                                         |[onUserSet](#user-content-stream-on-user-set)        |[onUserInvited](#user-content-team-on-user-invited)               |[statusUpdated](#user-content-thread-status-updated)          |
|[onEcho](#user-content-comment-on-echo)       |                                              |                                         |[read](#user-content-stream-read)                    |[onUserRemoved](#user-content-team-on-user-removed)               |[readDescription](#user-content-thread-read-description)      |
|[onMention](#user-content-comment-on-mention) |                                              |                                         |[setAdmin](#user-content-stream-set-admin)           |[read](#user-content-team-read)                                   |[read](#user-content-thread-read)                              |
|[read](#user-content-comment-read)            |                                              |                                         |[setName](#user-content-stream-set-name)             |                                                                  |[setBudget](#user-content-thread-set-budget)                  |
|                                              |                                              |                                         |[setUser](#user-content-stream-set-user)             |                                                                  |[setDeadline](#user-content-thread-set-deadline)              |
|                                              |                                              |                                         |                                                     |                                                                  |[setDescription](#user-content-thread-set-description)        |
|                                              |                                              |                                         |                                                     |                                                                  |[setPriority](#user-content-thread-set-priority)              |
|                                              |                                              |                                         |                                                     |                                                                  |[setResponsible](#user-content-thread-set-responsible)        |
|                                              |                                              |                                         |                                                     |                                                                  |[setStatus](#user-content-thread-set-status)                  |
|                                              |                                              |                                         |                                                     |                                                                  |[setStream](#user-content-thread-set-stream)                  |
|                                              |                                              |                                         |                                                     |                                                                  |[setTitle](#user-content-thread-set-title)                    |

| [file](#file)           |[mail](#mail)                      |[telephony](#telephony)              |
|---|---|---|
| [getGETUrl](#getGETUrl) |[getAccounts](#user-content-mail-get-accounts)|[create-user](#telephony-create-user)|
| [getPUTUrl](#getPUTUrl) |[onReceived](#user-content-mail-on-received)  |[delete-user](#telephony-delete-user)|
|                         |[onSent](#user-content-mail-on-sent)          |[get-user](#telephony-get-user)      |
|                         |[read](#user-content-mail-read)               |[update-user](#telephony-update-user)|
|                         |[send](#user-content-mail-send)               |                                     |

----------
### comment

```js
const botClient = botConnect(creds)
const { comment } = botClient
```
#### <a name="user-content-comment-conunt">count</a>

Метод для получения колличества комментариев.

```js
const { comment } = botClient
const query = { threadId }
const response = await comment.count(teamId, query)
console.log(response) // { code: 200, message: 'OK', count: 1 }
```

где query может принимать один из атрибутов: threadId, threadIds, streamId, includeActions


#### <a name="user-content-comment-create">create</a>
#### <a name="user-content-comment-delete">delete</a>
#### <a name="user-content-comment-on-created">onCreated</a>
#### <a name="user-content-comment-on-direct">onDirect</a>
#### <a name="user-content-comment-on-echo">onEcho</a>
#### <a name="user-content-comment-on-mention">onMention</a>
#### <a name="user-content-comment-read">read</a>

-------------

### contact

#### <a name="user-content-contact-create">create</a>
#### <a name="user-content-contact-get-locale">getLocale</a>
#### <a name="user-content-contact-read">read</a>
------------


### status

#### <a name="user-content-status-create">create</a>
#### <a name="user-content-status-read">read</a>
#### <a name="user-content-status-set-name">setName</a>

-----------


### stream

#### <a name="user-content-stream-create">create</a>
#### <a name="user-content-stream-delete-user">deleteUser</a>
#### <a name="user-content-stream-delete">delete</a>
#### <a name="user-content-stream-on-user-deleted">onUserDeleted</a>
#### <a name="user-content-stream-on-user-set">onUserSet</a>
#### <a name="user-content-stream-read">read</a>
#### <a name="user-content-stream-set-admin">setAdmin</a>
#### <a name="user-content-stream-set-name">setName</a>
#### <a name="user-content-stream-set-user">setUser</a>

----------


### team

#### <a name="user-content-team-get-accesses">getAccesses</a>
#### <a name="user-content-team-invite-user">inviteUser</a>
#### <a name="user-content-team-on-admin-status-given">onAdminStatusGiven</a>
#### <a name="user-content-team-on-admin-status-revoked">onAdminStatusRevoked</a>
#### <a name="user-content-team-on-user-invited">onUserInvited</a>
#### <a name="user-content-team-on-user-removed">onUserRemoved</a>
#### <a name="user-content-team-read">read</a>

----------


### thread

#### <a name="user-content-thread-create">create</a>
#### <a name="user-content-thread-on-budget-updated">onBudgetUpdated</a>
#### <a name="user-content-thread-on-created">onCreated</a>
#### <a name="user-content-thread-on-deadline-updated">onDeadlineUpdated</a>
#### <a name="user-content-thread-status-updated">statusUpdated</a>
#### <a name="user-content-thread-read-description">readDescription</a>
#### <a name="user-content-thread-read">read</a>
#### <a name="user-content-thread-set-budget">setBudget</a>
#### <a name="user-content-thread-set-deadline">setDeadline</a>
#### <a name="user-content-thread-set-description">setDescription</a>
#### <a name="user-content-thread-set-priority">setPriority</a>
#### <a name="user-content-thread-set-responsible">setResponsible</a>
#### <a name="user-content-thread-set-status">setStatus</a>
#### <a name="user-content-thread-set-stream">setStream</a>
#### <a name="user-content-thread-set-title">setTitle</a>

---------


### file

#### getGETUrl
#### getPUTUrl

---------


### mail

#### <a name="user-content-mail-get-accounts">getAccounts</a>
#### <a name="user-content-mail-on-received">onReceived</a>
#### <a name="user-content-mail-on-sent">onSent</a>
#### <a name="user-content-mail-read">read</a>
#### <a name="user-content-mail-send">send</a>

---------


### telephony

#### <a name="user-content-telephony-create-user">createUser</a>
#### <a name="user-content-telephony-delete-user">deleteUser</a>
#### <a name="user-content-telephony-get-user">getUser</a>
#### <a name="user-content-telephony-update-user">updateUser</a>
