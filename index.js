const { join } = require('path');
const properties = require('./properties');
const types = require('./types');
const Faker = require('json-schema-faker');

const loadSchema = function (rootSchemaPath, schemaPath) {
  const fullSchemaPath = join(rootSchemaPath, schemaPath);
  const schema = require(fullSchemaPath);
  return schema;
};

const generateResponseFromSchema = function (rootSchemaPath, schemaPath) {
  const schema = loadSchema(rootSchemaPath, schemaPath);
  return Faker.resolve(schema);
};

module.exports = {
  properties: properties,
  types: types,
  loadSchema: loadSchema,
  generateResponseFromSchema: generateResponseFromSchema,
};
