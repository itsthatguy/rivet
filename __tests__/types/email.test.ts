import { matchers } from 'jest-json-schema';
import { email } from '../../src/types';

expect.extend(matchers);

describe('types.email', () => {
  it('matches various email formats', () => {
    const schema = {
      required: ['email'],
      properties: { email },
    };

    expect({ email: 'bob@sho.rt' }).toMatchSchema(schema);
    expect({ email: 'bob-villa@sho.rt' }).toMatchSchema(schema);
    expect({ email: 'bob@example.com' }).toMatchSchema(schema);
    expect({ email: 'bob.villa@example.com' }).toMatchSchema(schema);
    expect({ email: 'bob+villa@example.com' }).toMatchSchema(schema);
  });
});
