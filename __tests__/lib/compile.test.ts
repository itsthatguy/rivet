import { compileHandler } from '../../src/lib/compile';
import * as fs from 'fs-extra';

jest.mock('fs-extra');

describe('compile', () => {
  it('compiles file to location specified', () => {
    const contracts = compileHandler({
      clean: '',
      out: './foo',
      src: 'example.contract.js',
      cwd: 'example/consumer/contracts/',
    });

    expect(contracts[0].path).toContain('example.contract.json');
    expect(JSON.parse(contracts[0].data)).toEqual({
      title: 'Index',
      required: [
        'name',
        'token',
        'description',
        'updated_at'
      ],
      properties: {
        name: {
          type: 'string'
        },
        token: {
          id: 'types.token',
          type: 'string',
          pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$'
        },
        description: {
          type: 'string'
        },
        updated_at: {
          type: 'string'
        }
      }
    });
  });
});
