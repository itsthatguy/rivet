# Getting Started

Install API-CONTRACTS using npm:

```shell
npm install --save-dev api-contracts
```

Or via yarn:

```shell
yarn add --dev api-contracts
```

Let's get started by creating a simple API. First, create a file `route.js`

```js
module.exports = function (request, response) {
  const payload = {
    data: {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
    }
  };

  response.status(200).json(payload);
};
```

Then, create a basic contract file at `contracts/example.contract.js`

```js
module.exports = {
  title: 'Example',
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        userId: { type: 'integer' },
        id: { type: 'integer' },
        title: { type: 'string' },
        body: { type: 'string' }
      },
      required: ['userId', 'id', 'title', 'body'],
    }
  },
  required: ['data'],
};

```

## Writing Tests

### Satisfying a Contract

Here's an example with jest, showing how to validate that your api satisfies your contract.

```js
const { matchers } = require('jest-json-schema');
const { loadSchema } = require('api-contracts');
const request = require('supertest');
const express = require('express');
const route = require('./route');

const app = express();

app.get('/example', route);

describe('My Api', () => {
  it('satisfies the contract', () => {
    const schema = loadSchema('example.contract');

    request(app)
    .get('/example')
    .set('Accept', 'application/json')
    .expect(200)
    .then(response => {
        expect(response).toMatchSchema(schema);
    });
  });
});
```

### Stubbing Data with a Contract

```js
const { generateSync } = require('api-contracts');
const nock = require('nock');
const axios = require('axios');

describe('My Api', () => {
  it('satisfies the contract', (done) => {
    const stubbedData = generateSync('example.contract');

    nock('http://fakeser.ver')
    .get('/example')
    .reply(200, stubbedData);

    axios.get('http://fakeser.ver/example')
    .then((response) => {
      const payloadKeys = Object.keys(response.data);

      expect(payloadKeys)
      .toEqual(expect.arrayContaining([
        'userId',
        'id',
        'title',
        'body'
      ]);

      done();
    });
  });
});
```
