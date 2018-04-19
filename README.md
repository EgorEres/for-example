## workonflow-bot-client ##

#### Установка

```js
$ npm install workonflow-bot-client

const botConnect = require('workonflow-bot-client').connect

const creds = {
  email: "you email",
  password: "you password"
}

const botClient = await botConnect(creds)
```

### Как использовать ###

```js
const botClient = await botConnect(creds)

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
|[onCreated](#user-content-comment-on-created) |[read](#user-content-contact-read)            |[setName](#user-content-status-set-name) |[delete](#user-content-stream-delete)                |[onAdminStatusGiven](#user-content-team-on-admin-status-given)    |[onCreated](#user-content-thread-on-created)                  |
|[onDirect](#user-content-comment-on-direct)   |                                              |                                         |[onUserDeleted](#user-content-stream-on-user-deleted)|[onAdminStatusRevoked](#user-content-team-on-admin-status-revoked)|[onDeadlineUpdated](#user-content-thread-on-deadline-updated)|
|[onEcho](#user-content-comment-on-echo)       |                                              |                                         |[onUserSet](#user-content-stream-on-user-set)        |[onUserInvited](#user-content-team-on-user-invited)               |[onStatusUpdated](#user-content-thread-status-updated)          |
|[onMention](#user-content-comment-on-mention) |                                              |                                         |[read](#user-content-stream-read)                    |[onUserRemoved](#user-content-team-on-user-removed)               |[readDescription](#user-content-thread-read-description)      |
|[read](#user-content-comment-read)            |                                              |                                         |[setAdmin](#user-content-stream-set-admin)           |[read](#user-content-team-read)                                   |[read](#user-content-thread-read)                              |
|                                              |                                              |                                         |[setName](#user-content-stream-set-name)             |                                                                  |[setBudget](#user-content-thread-set-budget)                  |
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

#### Методы работы с комментариями

```js
const botClient = await botConnect(creds)
const { comment } = botClient
```
#### <a name="user-content-comment-conunt">comment.count</a>

Метод для получения колличества комментариев.

```js
const { comment } = botClient
const query = { threadId }
const response = await comment.count(teamId, query)
console.log(response) // { code: 200, message: 'OK', count: 1 }
```

где query может принимать один из атрибутов:
- **threadId** - id задачи;
- **threadIds** - массив из нескольких id задач;
- **streamId** - id потока;
> в ответе поле **count** - кол-во комментариев

<div style="border:1px,solid;"></div>

#### <a name="user-content-comment-create">comment.create</a>

Метод для создания комментариев

```js
const { comment } = botClient
const query = { threadId }
const response = await comment.create(teamId, query)
console.log(response) // { code: 200, message: 'OK', data: '5ad6f9be219171001f64dc0f' }
```

где query может принимать параметры:
- **streamId** - id потока (для публикации комментария в общем чате потока);
- **threadId** - id задачи (для публикации комментария в задаче);
- **to** - id пользователя в системе, может также принимать массив id пользователей (если указать только поле **to** то комментарий будет опубликован в *личных* сообщениях);
- **att** - имеет вид типа: [{ type: 'text' data: { text: 'string' } }]
-- **type** - тим сообщения может быть *text*, *file*.
-- **data** - объект с текстом либо id файла

> в ответе поле **data** - id комментария

#### <a name="user-content-comment-on-created">comment.onCreated</a>

Метод который отлавливает созданные коментарии
принимает в себя функцию обратного выхова (callback function)

```js
const { comment } = botClient
const cb = message => {
  console.log(message)
}
await comment.onCreated(cb)
```
> Пример сообщения смотри [тут](./sorta-docs/onCreated-message.md)

#### <a name="user-content-comment-on-direct">comment.onDirect</a>

Метод который отлавливает создание комментария в личные сообщения боту
принимает в себя функцию обратного выхова (callback function)

```js
const { comment } = botClient
const cb = message => {
  console.log(message)
}
await comment.onDirect(cb)
```

> Пример сообщения смотри [тут](./sorta-docs/onDirect-message.md)

#### <a name="user-content-comment-on-echo">comment.onEcho</a>
in developing
#### <a name="user-content-comment-on-mention">comment.onMention</a>

Метод который отлавливает создание комментария с упоминанием бота
принимает в себя функцию обратного выхова (callback function)

```js
const { comment } = botClient
const cb = message => {
  console.log(message)
}
await comment.onMention({keepBotRef: true}, cb)
```
Метод вырезает упоминание бота в сообщении,
если указать параметр { keepBotRef: true } то метод вернет полное сообщение с упоминанием бота

> Пример сообщения смотри [тут](./sorta-docs/onMention-message.md)

#### <a name="user-content-comment-read">comment.read</a>

Метод для получения комментариев

```js
const { comment } = botClient
const query = { id }
const response = await comment.read(teamId, query)
console.log(response) // { code: 200, message: 'OK', data: '5ad6f9be219171001f64dc0f' }
```
где query может принимать параметры:
- **id** - id комментария (вернёт коментарий);
- **streamId** - id потока (вернёт последнии 100 коментариев потока);
- **threadId** - id задачи (вернёт последнии 100 коментариев задачи);
- **skip** - дополнительный параметр, число - кол-ва комментариев которые необходимо пропустить;
- **type** - дополнительный параметр, тип коментария

> Пример ответа смотри [тут](./sorta-docs/comment-read-response.md)

-------------

### contact

#### Методы работы с контактами и пользователями

```js
const botClient = await botConnect(creds)
const { contact } = botClient
```
#### <a name="user-content-contact-create">contact.create</a>

Метод для создания контакта

```js
const { contact } = botClient
const query = {
  basicData: {name: "new name customer"}
  customFields: [
    {id: "B1R5NTS3z", label: "Company", value: "", type: "company"},
    {id: "B1l094TB2M", label: "Work phone", value: "", type: "phone"},
    {id: "rkbA9VTH3M", label: "Work e-mail", value: "", type: "email"}
  ]
}
const response = await contact.create(teamId, query)
console.log(response)
```
где query должен принимать параметры:
- **basicData** - принимает объект с именем контакта;
- **customFields** - поля для добавление каналов с контактом

> Пример ответа
```js
{
  code: 200,
  message: 'OK',
  data: { insertedCount: 1, insertedId: 'new contact id' }
}
```
где insertedId - id созданного контакта

#### <a name="user-content-contact-get-locale">contact.getLocale</a>

Метод для получения "языка" пользователя

```js
const { contact } = botClient
const query = { id: 'user id' }
const response = await contact.getLocale(teamId, query)
console.log(response)
```

> Пример ответа
```js
{ code: 200, message: 'OK', data: { locale: 'en' } }
```

#### <a name="user-content-contact-read">contact.read</a>

Метод для получения пользоватей

```js
const { contact } = botClient
const query = { id: 'user id' }
const response = await contact.read(teamId, query)
console.log(response)
```
где query может быть:
- **id** - id контакта или пользователя;
- **ids** - несколько id контактов или пользователей

> Пример ответа смотри [тут](./sorta-docs/contact-read-response.md)

------------


### status

#### Методы работы со статусами потока

```js
const botClient = await botConnect(creds)
const { status } = botClient
```
#### <a name="user-content-status-create">status.create</a>

Метод для создания статуса потока

```js
const { status } = botClient
const query = {
  name: 'new status name',
  streamId: 'id stream',
  type: 'Done',
  color: 'randomColor()'
}
const response = await status.create(teamId, query)
console.log(response)
```

где query принимает следующие параметры:
- **color** - цвет статуса (для этого обычно используем библиотеку randomColor(), либо любой цвет формата - #c0c0c0);
- **name**- название статуса
- **streamId** - id потока в который создаём статус
- **type** - один из глобальных статусов *Wait*, *In progress*, *Done*

> Пример ответа
```js
{code: 200, message: "Ok", data: "id new status"}
```

#### <a name="user-content-status-read">status.read</a>

Метод для получения статуса

```js
const { status } = botClient
const query = { id: statusId }
const response = await status.read(teamId, query)
console.log(response)
```
где query может принимать параметры:
- **id** - id статуса;
- **streamId** - id потока, для получения всех статусов в потоке

> Пример ответа смотри [тут](./sorta-docs/status-read-response.md)

#### <a name="user-content-status-set-name">status.setName</a>

Метод для изменения имени статуса

```js
const { status } = botClient
const query = { id: statusId, name: 'new status name' }
const response = await status.setName(teamId, query)
console.log(response)
```
где query может принимать параметры:
- **id** - id статуса;
- **name** - новое имя для статуса

> Пример ответа смотри [тут](./sorta-docs/status-set-name-response.md)

-----------


### stream

#### Методы работы с потоками

```js
const botClient = await botConnect(creds)
const { stream } = botClient
```

#### <a name="user-content-stream-create">stream.create</a>

Метод для создания потока

```js
const { stream } = botClient
const query = {
  name: 'new stream name',
  isEmpty: true
}
const response = await stream.create(teamId, query)
console.log(response)
```

где query принимает следующие параметры:
- **name**- название потока
- **isEmpty** - по умолчанию поток создаётся с 3мя статусами, если указать данный параметр будет создан пустой поток
- **settings** - подробнен про данный параметр смотри [тут](./sorta-docs/stream-create-settings.md)

> Пример ответа
```js
{code: 200, message: "Ok", data: "id new stream"}
```

name, settings, isEmpty
#### <a name="user-content-stream-delete-user">stream.deleteUser</a>

Метод для удаления участника из потока

```js
const { stream } = botClient
const query = { id: 'stream id', user: 'user id' }
const response = await stream.deleteUser(teamId, query)
console.log(response)
```
где query должен принимать параметры:
- **id** - id статуса;
- **user** - id пользователя которога надо удалить из участников потока

> Пример ответа {code: 200, message: "OK"}

#### <a name="user-content-stream-delete">stream.delete</a>
in developing
#### <a name="user-content-stream-on-user-deleted">stream.onUserDeleted</a>

Метод который отлавливает удаление пользователя из потока

```js
const { stream } = botClient
const cb = message => {
  console.log(message)
}
await stream.onUserDeleted({self: true}, cb)
```

Параметр {self: true} отлавливает сообщения о удалении из потока только бота если указать false будут поступать сообщения о удалении любого пользователя

> Пример сообщения смотри [тут](./sorta-docs/onUserDeleted-message.md)

#### <a name="user-content-stream-on-user-set">stream.onUserSet</a>

Метод который отлавливает добавление пользователя в поток

```js
const { stream } = botClient
const cb = message => {
  console.log(message)
}
await stream.onUserSet({self: true}, cb)
```

Параметр {self: true} отлавливает сообщения о добавлении в поток только бота если указать false будут поступать сообщения о добавлении любого пользователя

> Пример сообщения смотри [тут](./sorta-docs/onUserSet-message.md)

#### <a name="user-content-stream-read">stream.read</a>

Метод для получения потока

```js
const { stream } = botClient
const query = { id: streamId }
const response = await stream.read(teamId, { query })
console.log(response)
```

где query может принимать параметры:
- **id** - id потока
- **ids** - массив нескольких id потока

> Пример ответа смотри [тут](./sorta-docs/stream-read-response.md)

#### <a name="user-content-stream-set-admin">stream.setAdmin</a>
in developing
#### <a name="user-content-stream-set-name">stream.setName</a>

Метод для изменении имени потока

```js
const { stream } = botClient
const query = { id: 'stream id', name: 'new stream name' }
const response = await stream.setName(teamId, query)
console.log(response)
```
где query должен принимать параметры:
- **id** - id статуса;
- **name** - новое имя потока

> Пример ответа {code: 200, message: "OK"}

#### <a name="user-content-stream-set-user">stream.setUser</a>

Метод для добавления участника в поток

```js
const { stream } = botClient
const query = { id: 'stream id', user: 'user id' }
const response = await stream.setUser(teamId, query)
console.log(response)
```
где query должен принимать параметры:
- **id** - id статуса;
- **user** - id пользователя которого надо добавить в участники потока

> Пример ответа {code: 200, message: "OK"}

----------


### team

#### <a name="user-content-team-invite-user">team.inviteUser</a>
in developing
#### <a name="user-content-team-on-admin-status-given">team.onAdminStatusGiven</a>
in developing
#### <a name="user-content-team-on-admin-status-revoked">team.onAdminStatusRevoked</a>
in developing
#### <a name="user-content-team-on-user-invited">team.onUserInvited</a>

Метод который отлавливает добавление пользователя в тиму

```js
const { team } = botClient
const cb = message => {
  console.log(message)
}
team.onUserInvited({ self: true }, cb)
```

Параметр {self: true} отлавливает сообщения о добавлении в тиму только бота если указать false или не указывать этот параметр будут поступать сообщения о добавлении любого пользователя

> Пример сообщения
```js
{ teamId: 'team id',
  data: {
    userId: 'user id',
    email: 'user email'
  }
}
```

#### <a name="user-content-team-on-user-removed">onUserRemoved</a>

Метод который отлавливает удаление пользователя из тимы

```js
const { team } = botClient
const cb = message => {
  console.log(message)
}
team.onUserRemoved({ self: true }, cb)
```

Параметр {self: true} отлавливает сообщения о удалении из тимы только бота если указать false или не указывать этот параметр будут поступать сообщения о удалении любого пользователя

> Пример сообщения
```js
{ teamId: 'team id',
  data: { userId: 'user id' }
}
```
#### <a name="user-content-team-read">read</a>

Метод для получения тимы

> Информация будет доступна только по тем тимам в которых бот приглашён

```js
const { team } = botClient
const response = await team.read(teamId)
console.log(response)
```

> Пример ответа

----------


### thread

#### <a name="user-content-thread-create">thread.create</a>

Метод для создания задачи

```js
const { thread } = botClient
const query = { title: 'some title', streamId, statusId }
const response = await thread.create(teamId, { query })
console.log(response)
```
где query может принимать параметры:
- **streamId** - id потока где создаём задачу;
- **statusId** - id статуса в потоке где создаём задачу;
- **title** - имя задачи;
- **deadline** - необязательное поле, дедлайн у задачи;
- **responsibleUserId** - необязательное поле, ответственный за задачу;
- **customerId** - необязательное поле, клиент по задаче;
- **roles** - необязательное поле, фоловеры задачи

> Пример ответа
```js
{ code: 200, message: 'OK', data: 'id new thread' }
```

#### <a name="user-content-thread-on-budget-updated">thread.onBudgetUpdated</a>
in developing
#### <a name="user-content-thread-on-created">thread.onCreated</a>

Метод который отлавливает создание задачи

```js
const { thread } = botClient
const cb = message => {
  console.log(message)
}
await thread.onCreated(cb)
```

> Пример сообщения смотри [тут](./sorta-docs/thread-onCreated-message.md)

#### <a name="user-content-thread-on-deadline-updated">thread.onDeadlineUpdated</a>
in developing
#### <a name="user-content-thread-status-updated">thread.onStatusUpdated</a>

Метод который отлавливает изменение статуса задачи

```js
const { thread } = botClient
const cb = message => {
  console.log(message)
}
await thread.onStatusUpdated(cb)
```

> Пример сообщения смотри [тут](./sorta-docs/thread-onStatusUpdated-message.md)

#### <a name="user-content-thread-read-description">thread.readDescription</a>
in developing
#### <a name="user-content-thread-read">thread.read</a>

Метод для получения задачи

```js
const { thread } = botClient
const query = { id: threadId }
const response = await thread.read(teamId, { query })
console.log(response)
```

где query может принимать параметры:
- **id** - id задачи;
- **statusId** - id статуса (вернет все задачи в данном статусе);
- **streamId** - id потока (вернёт все задачи потока)

> Пример ответа смотри [тут](./sorta-docs/thread-read-response.md)

#### <a name="user-content-thread-set-budget">thread.setBudget</a>
in developing
#### <a name="user-content-thread-set-deadline">thread.setDeadline</a>
in developing
#### <a name="user-content-thread-set-description">thread.setDescription</a>
in developing
#### <a name="user-content-thread-set-priority">thread.setPriority</a>
in developing
#### <a name="user-content-thread-set-responsible">thread.setResponsible</a>

Метод для установки ответственного за задачу
необходимо передать id задачи и id пользователя

```js
const { thread } = botClient
const query = { id: threadId, userId }
const response = await thread.setResponsible(teamId, { query })
console.log(response)
```

> Пример ответа смотри [тут](./sorta-docs/thread-setResponsible-response.md)

#### <a name="user-content-thread-set-status">setStatus</a>
in developing
#### <a name="user-content-thread-set-stream">setStream</a>
in developing
#### <a name="user-content-thread-set-title">setTitle</a>
in developing
---------


### file

#### getGETUrl
in developing
#### getPUTUrl
in developing

---------


### mail

#### <a name="user-content-mail-get-accounts">getAccounts</a>
in developing
#### <a name="user-content-mail-on-received">onReceived</a>
in developing
#### <a name="user-content-mail-on-sent">onSent</a>
in developing
#### <a name="user-content-mail-read">read</a>
in developing
#### <a name="user-content-mail-send">send</a>
in developing

---------


### telephony

#### <a name="user-content-telephony-create-user">createUser</a>
in developing
#### <a name="user-content-telephony-delete-user">deleteUser</a>
in developing
#### <a name="user-content-telephony-get-user">getUser</a>
in developing
#### <a name="user-content-telephony-update-user">updateUser</a>
in developing
