import { matchers } from 'jest-json-schema';
import { phone } from '../../src/types';

expect.extend(matchers);

describe('compile', () => {
  it('matches various phone number formats', () => {
    const schema = {
      required: ['phone'],
      properties: { phone },
    };

    expect({ phone: '12345678900' }).toMatchSchema(schema);
    expect({ phone: '+12345678900' }).toMatchSchema(schema);
    expect({ phone: '2345678900' }).toMatchSchema(schema);
    expect({ phone: '(234) 567-8900' }).toMatchSchema(schema);
    expect({ phone: '(555)-555-5555'}).toMatchSchema(schema);
    expect({ phone: '555-555-5555'}).toMatchSchema(schema);
    expect({ phone: '+1-555-532-3455'}).toMatchSchema(schema);
  });
});
