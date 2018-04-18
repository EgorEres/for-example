## Example massage

#### if method call with keepBotRef parameter

- in stream

```js
{ teamId: 'some team id',
  data: {
    id: 'comment id',
    userId: 'some user id',
    content: {
      createdAt: 1524043332761,
      updatedAt: 1524043332761,
      to: [ 'bot id' ],
      from: 'user id',
      att:  [ { type: 'text', data: { text: '@botId@ some text' } } ],
      streamId: 'some stream id',
      _id: 'comment id',
    }
  }
}
```

- in thread

```js
{ teamId: 'some team id',
  data: {
    id: 'comment id',
    threadId: 'some thread id',
    userId: 'some user id',
    content: {
      createdAt: 1524043332761,
      updatedAt: 1524043332761,
      to: [ 'bot id' ],
      from: 'user id',
      att:  [ { type: 'text', data: { text: '@botId@ some text' } } ],
      threadId: 'some thread id',
      streamId: 'some stream id',
      _id: 'comment id',
    }
  }
}
```

#### if method call without keepBotRef parameter

- in stream

```js
{ teamId: 'some team id',
  data: {
    id: 'comment id',
    userId: 'some user id',
    content: {
      createdAt: 1524043332761,
      updatedAt: 1524043332761,
      to: [ 'bot id' ],
      from: 'user id',
      att:  [ { type: 'text', data: { text: '@botId@ some text' } } ],
      streamId: 'some stream id',      
      _id: 'comment id',
    }
  }
}
```

- in thread

```js
{ teamId: 'some team id',
  data: {
    id: 'comment id',
    threadId: 'some thread id',
    userId: 'some user id',
    content: {
      createdAt: 1524043332761,
      updatedAt: 1524043332761,
      to: [ 'bot id' ],
      from: 'user id',
      att:  [ { type: 'text', data: { text: '@botId@ some text' } } ],
      streamId: 'some stream id',
      threadId: 'some thread id',
      _id: 'comment id',
    }
  }
}
```