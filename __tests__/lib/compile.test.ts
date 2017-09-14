import { compileHandler } from '../../src/lib/compile';
import * as fs from 'fs-extra';

jest.mock('fs-extra');

describe('compile', () => {
  it('compiles file to location specified', () => {
    const contracts = compileHandler({
      clean: '',
      out: './foo',
      src: 'src/types/email.ts',
    });

    expect(contracts[0].path).toContain('types/email.json');
    expect(JSON.parse(contracts[0].data)).toEqual({default: {
      id: 'types.email',
      type: 'string',
      format: 'email'
    }});
  });
});
