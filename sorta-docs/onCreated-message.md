## Example massage

#### if comment create in stream

```js
{ teamId: 'some team id',
  data: {
    id: 'comment id',
    userId: 'some user id',
    content: {
      createdAt: 1524043332761,
      type: '',
      updatedAt: 1524043332761,
      to: [],
      from: 'user id',
      metadata: { userId: 'some user id' },
      att:  [ { type: 'text', data: { text: 'some text' } } ],
      streamId: 'some stream id',
      _id: 'comment id',
    }
  }
}
```
----------

#### if comment create in thread

```js
{ teamId: 'some team id',
  data: {
    id: 'comment id',
    threadId: 'some thread id',
    userId: 'some user id',
    content: {
      createdAt: 1524043417953,
      type: '',
      updatedAt: 1524043417953,
      to: [],
      from: 'user id',
      metadata: { userId: 'some user id' },
      att:  [ { type: 'text', data: { text: 'some text' } } ],
      threadId: 'some thread id',
      streamId: 'some stream id',
      _id: 'comment id'
    }
  }
}
```

#### and others comment create
```js
{ teamId: 'some team id',
  data: {
    id: 'comment id',
    content: {
      createdAt: 1524044053403,
      type: 'some comment type',
      updatedAt: 1524044053403,
      to: [],
      from: '',
      metadata: [Object],
      att: [],
      threadId: 'thread id if comment in thread',
      streamId: 'stream id if comment in stream',
      _id: 'comment id',
      __v: 0 } },
}
```
