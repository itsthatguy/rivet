import { join, resolve } from 'path';
import * as types from './types';
import * as jsf from 'json-schema-faker';
import Config from './lib/config';

const getFilePath = (schemaPath: string): string => {
  const regex = /^(.+)\//;
  const match = schemaPath.match(regex);
  const aliasKey = match && match[1] || '';
  const relativePath = schemaPath.replace(regex, '');
  const pathAlias = Config.aliases[aliasKey] || Config.contractsRoot;
  const absolutePath = resolve(Config.appRoot, pathAlias, relativePath);
  return absolutePath;
};

const getSchema = (schemaPath: string | {}): Promise<any> | {} => {
  const schema = (typeof schemaPath === 'string')
    ? load(schemaPath)
    : schemaPath;

  return schema;
};

export const load = (schemaPath: string): any => {
  const absolutePath = getFilePath(schemaPath);
  const schema = require(absolutePath);
  return schema;
};

export const generate = (schemaPath: string | {}): Promise<any> => {
  const schema = getSchema(schemaPath);
  return jsf.resolve(schema);
};

export const generateSync = (schemaPath: string | {}): {} => {
  const schema = getSchema(schemaPath);
  return jsf(schema);
};

export { types, Config };
