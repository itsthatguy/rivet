import { join } from 'path';
import * as types from './types';
import { resolve } from 'json-schema-faker';

export const loadSchema = (schemaPath: string): any => {
  const schema = require(schemaPath);
  return schema;
};

export const generateResponseFromSchema = (schemaPath: string | {}): Promise<any> => {
  const schema = (typeof schemaPath === 'string')
    ? loadSchema(schemaPath)
    : schemaPath;
  return resolve(schema);
};

export { types };
