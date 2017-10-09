import { matchers } from 'jest-json-schema';
import { jwt } from '../../src/types';

expect.extend(matchers);

describe('types.jwt', () => {
  it('matches jwt format', () => {
    const schema = {
      required: ['token'],
      properties: { jwt },
    };

    expect({ token: 'ABC3EFGH.IJKLMN7PQRSTU.VWXYZ1234567890' }).toMatchSchema(schema);
  });
});
