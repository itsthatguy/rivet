import { matchers } from 'jest-json-schema';
import { uri } from '../../src/types';

expect.extend(matchers);

describe('types.uri', () => {
  it('matches various uri formats', () => {
    const schema = {
      required: ['url'],
      properties: { uri },
    };

    expect({ url: 'foo.bar' }).toMatchSchema(schema);
    expect({ url: 'http://foo.bar' }).toMatchSchema(schema);
    expect({ url: 'https://foo.bar' }).toMatchSchema(schema);
    expect({ url: 'http://foo.bar/baz' }).toMatchSchema(schema);
    expect({ url: 'https://foo.bar/baz' }).toMatchSchema(schema);
    expect({ url: 'git://foo.bar/baz' }).toMatchSchema(schema);
    expect({ url: 'ssh://git@foo.bar/baz' }).toMatchSchema(schema);
    expect({ url: 'ssh://git@foo.bar/baz.git' }).toMatchSchema(schema);
  });
});
