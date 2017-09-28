import { join } from 'path';
import * as types from './types';
import { resolve } from 'json-schema-faker';

export const load = (schemaPath: string): any => {
  const schema = require(schemaPath);
  return schema;
};

export const generate = (schemaPath: string | {}): Promise<any> => {
  const schema = (typeof schemaPath === 'string')
    ? load(schemaPath)
    : schemaPath;
  return resolve(schema);
};

export { types };
