import { join } from 'path';
import * as properties from './properties';
import * as types from './types';
import Faker from 'json-schema-faker';

const loadSchema = function (rootSchemaPath:string, schemaPath:string):any {
  const fullSchemaPath = join(rootSchemaPath, schemaPath);
  const schema = require(fullSchemaPath);
  return schema;
};

const generateResponseFromSchema = function (rootSchemaPath:string, schemaPath:string):any {
  const schema = loadSchema(rootSchemaPath, schemaPath);
  return Faker.resolve(schema);
};

export default {
  properties: properties,
  types: types,
  loadSchema: loadSchema,
  generateResponseFromSchema: generateResponseFromSchema,
};
