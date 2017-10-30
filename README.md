# Rivet
[![Build status](https://badge.buildkite.com/deb70e546dbbb4bed518f070f306544e35288f023bbe88814c.svg?branch=master)](https://buildkite.com/itsthatguy/rivet) [![npm version](https://badge.fury.io/js/rivet.svg)](https://badge.fury.io/js/rivet)

[Docs](http://rivet.itg.sh) | [Issues](https://github.com/itsthatguy/rivet/issues)

![Rivet](docs/logo.png)

Rapid, modern web service development, typically involving layers of microservices, reaches a point where a single non-backwards compatible API change affects multiple teams, leading to cascading service failures and finger-pointing. **Rivet** describes a solution where each service tests itself against real clients in order to assert that no interfaces have broken any clients at each step of the way.

## Vocabulary

Rivet uses _services_ and _consumers_ in describing these relationships.

* _Consumer_ — A client that talks to an API service
* _Service_ — An API service that consumers depend on for data

## The Problem

With these types of service relationships, trouble arises when you'd like to make a change to an API without breaking other consumers.

People use tools like API Blueprint or Swagger or tests within the API's code itself to specify the requirements for an API. However, these tools and strategies do not account for the consuming applications that may break. You can change a test with the APIs codebase and not know whether you've broken any given consumer.

By having the _consumers_ define their requirements through contracts, we gain direct visibility into any _consumer_ breaking change to a _service_. For example, if you are forced into a making a backwards incompatible change \(due to security, something upstream, or something simply out of your control\), the _service_ being aware of each client's requirements tell you exactly what clients need to be updated to handle the change. Whether you have versioned api mechanisms or not.

![](/assets/breaking-changes.png)

## Generic Metaphor

For example, take a factory that manufactures widgets:

Two customers come to have widgets made. The factory has a base widget that it modifies for different customers needs.

* **Customer 1:** widget with twist it, bop it, spin it
* **Customer 2:** widget with twist it, spin it

* **Factory:** Removes _bop it_, without checking the contracts in place for their customer orders

* **Customer 1:** Now mad that they don't have a _bop it_ anymore

* **Customer 2:** Doesn't notice the change because it's not required

If the factory had a check in place to ensure that their client's needs were met, they would have known to add a _bop it_ for Customer 1.

# Getting Started

Install Rivet using npm:

```shell
npm install --save-dev rivet
```

Or via yarn:

```shell
yarn add --dev rivet
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
const { loadSchema } = require('rivet');
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
const { generateSync } = require('rivet');
const nock = require('nock');
const axios = require('axios');

describe('My Api', () => {
  it('satisfies the contract', done => {
    const stubbedData = generateSync('example.contract');

    nock('http://fakeser.ver')
      .get('/example')
      .reply(200, stubbedData);

    axios.get('http://fakeser.ver/example').then(response => {
      const payloadKeys = Object.keys(response.data);

      expect(payloadKeys).toEqual(
        expect.arrayContaining(['userId', 'id', 'title', 'body'])
      );

      done();
    });
  });
});
```
