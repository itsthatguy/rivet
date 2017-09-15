import { join } from 'path';
import * as types from './types';
import { resolve } from 'json-schema-faker';

export const loadSchema = (rootSchemaPath: string, schemaPath: string): any => {
  const fullSchemaPath = join(rootSchemaPath, schemaPath);
  const schema = require(fullSchemaPath);
  return schema;
};

export const generateResponseFromSchema = (rootSchemaPath: string, schemaPath: string): Promise<any> => {
  const schema = loadSchema(rootSchemaPath, schemaPath);
  return resolve(schema);
};

export { types };
