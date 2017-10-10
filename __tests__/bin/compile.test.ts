import { compileHandler } from '../../src/bin/compile';
import * as fs from 'fs-extra';

jest.mock('fs-extra');

describe('compile', () => {
  it('compiles file to location specified', () => {
    const contracts = compileHandler({
      clean: '',
      out: 'example/consumer/contracts/',
      cwd: 'example/consumer/contracts/',
    });

    expect(contracts[0].path).toContain('contracts/json/example.contract.json');
    expect(contracts[1].path).toContain('contracts/json/subfolder/nested.contract.json');
    expect(JSON.parse(contracts[0].data)).toEqual({
      title: 'Example Contract',
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

    expect(JSON.parse(contracts[1].data)).toEqual({
      title: 'Nested Contract',
      required: [ 'name' ],
      properties: {
        name: { type: 'string' },
      }
    });
  });
});
