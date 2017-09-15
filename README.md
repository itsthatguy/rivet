# api-contracts

This package ships with 2 primary functions, categorized as such:
1. [Helpers](#helpers)
2. [CLI](#cli)

## Helpers

There are 2 types of helpers in this package.
### Functions

#### .generateResponseFromSchema(rootSchemaPath, schemaPath) [async]

Generates a fake object, based on the schema (contract), that can be use to `nock` server responses.

* **rootSchemaPath:** The path to where your contracts are stored.
* **schemaPath:** The path, from the _rootSchemaPath_ to where the schema file is located.

Example:

```js
const nock = require('nock');
const { generateResponseFromSchema } = require('api-contracts');
const producerContractPath = '../__contracts__';

describe('Example Test', () => {
  it('loads the contract', async () => {
    const response = await generateResponseFromSchema(producerContractPath, 'example.contract.json');
    const expectedResponse = { isAwesome: true };

    nock('http://example.com')
    .get('/example')
    .reply(200, response);

    const request = await makeARequest();
    expect(request.body).toEqual(expectedResponse);
  });
});
```

#### .loadSchema(rootSchemaPath, schemaPath)

Loads a schema file to use for validating a payload.

* **rootSchemaPath:** The path to where your contracts are stored.
* **schemaPath:** The path, from the _rootSchemaPath_ to where the schema file is located.

Example:

```js
const nock = require('nock');
const { matchers } = require('jest-json-schema');
const {
  generateResponseFromSchema,
  loadSchema,
} = require('api-contracts');
const producerContractPath = '../__contracts__';
const consumerContractPath = '@org/consumer-contracts/contracts';

expect.extend(matchers);

describe('Example Test', () => {
    it('Returns the correct payload', async () => {
      const routeRequest = {
        params: { accountNumber: 1 },
      };
      const response = await generateResponseFromSchema(producerContractPath, '/Example/get.contract.json');

      nock('http://example.com')
      .get('/example/1')
      .reply(200, response);

      const schema = loadSchema(consumerContractPath, '/Example/get.contract.json');

      const request = await getExample(routeRequest);
      expect(request.body).toMatchSchema(schema);
    });
  });
```

### json-schema types, and properties

Json-schema types, and properties exist to make defining schemas for your application much easier, and less redundant. To do this, we take commonly used elements in a schema, define them here, then in your application schemas you can simply do the following:

```js
const { types, properties } = require('api-contracts');


module.exports = {
  title: 'Example',
  type: 'object',
  required: ['email', 'links'],

  properties: {
    email: types.email,
    links: properties.links,
  }
};
```

To use json-schema types, or properties in your . You will need to require them

#### types

Types live in the `./types` folder. These are simple definition of a single property *type*. For example, here is the code used for the `uri` type:

```json
{
  "id": "types.uri",
  "type": "string",
  "pattern": "[0-9a-fA-F]{8,20}"
}
```

#### properties

Properties live in the `./properties` folder. These are more complex definitions that typically will include children, and might even import various `types`. Here is what the `links` property looks like:

```json
{
  "id": "properties.links",
  "type": "object",
  "required": [ "self" ],
  "properties": {
    "self": {
      "type": "string",
      "pattern": "^https?:\\/\\/[a-f]{3,10}\\.[a-f]{3}"
    }
  }
}
```

## CLI

The CLI is used to version bump and publish contracts inside an application. Once this package is installed in your application you can run the commands shown below from the repo's root directoy. If your contracts are stored in the `__contracts__` folder, the CLI will take care of navigating to that folder to publish, and version bump.

Usage:
```shell
# To see all available options
proco --help
```
