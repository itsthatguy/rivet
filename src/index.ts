import { join } from 'path';
import * as types from './types';
import * as jsf from 'json-schema-faker';
import Config from './bin/config';
import { resolve } from 'path';

export const load = (schemaPath: string): any => {
  const absolutePath = getFilePath(schemaPath);
  const schema = require(absolutePath);
  return schema;
};

const getFilePath = (schemaPath: string): string => {
  const regex = /^(.+)\//;
  const aliasKey = schemaPath.match(regex)[1];
  const relativePath = schemaPath.replace(regex, '');
  const pathAlias = Config.aliases[aliasKey] || Config.contractsRoot;
  const absolutePath = resolve(Config.appRoot, pathAlias, relativePath);
  return absolutePath;
};

export const generate = (schemaPath: string | {}): Promise<any> => {
  const schema = (typeof schemaPath === 'string')
    ? load(schemaPath)
    : schemaPath;
  return jsf.resolve(schema);
};

export const generateSync = (schemaPath: string | {}): any => {
  const schema = (typeof schemaPath === 'string')
    ? load(schemaPath)
    : schemaPath;
  return jsf(schema);
};

export { types, Config };
