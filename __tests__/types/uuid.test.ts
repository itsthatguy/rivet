import { matchers } from 'jest-json-schema';
import { uuid } from '../../src/types';

expect.extend(matchers);

describe('types.uuid', () => {
  it('matches various uuid formats', () => {
    const schema = {
      required: ['id'],
      properties: { id: uuid },
    };

    expect({ id: 'efbf1234-1242-3fd1-8d9c-94d8c3a22ec7' }).toMatchSchema(schema);
    expect({ id: '14f114e8-449b-4bb8-b6b6-e0fe48b650e5' }).toMatchSchema(schema);
    expect({ id: '39b88796-8b6b-4f76-aacd-a530235f85b8' }).toMatchSchema(schema);
    expect({ id: '623bf773-a86f-4371-81c6-b4133cc67c73' }).toMatchSchema(schema);
    expect({ id: '69dab668-bcb6-40f9-90b2-0d3181da0987' }).toMatchSchema(schema);
    expect({ id: '9f20d246-bc75-4a8b-b423-9a238a7ea151' }).toMatchSchema(schema);
    expect({ id: '756be421-8985-4c0b-adc8-3c65c5807622' }).toMatchSchema(schema);
    expect({ id: 'ff984090-387d-4cc8-b9f9-1f4e348a9170' }).toMatchSchema(schema);
    expect({ id: '944595f4-8748-4ae7-bd4c-4de44e1cc2b3' }).toMatchSchema(schema);
    expect({ id: 'ff5d5b00-dc27-4ea7-a19f-8f934cee64f8' }).toMatchSchema(schema);
    expect({ id: '3fab55f4-a235-479c-8d79-60eba475390f' }).toMatchSchema(schema);
    expect({ id: '72308901-0849-4fb3-89a7-5e332672e785' }).toMatchSchema(schema);
    expect({ id: 'a8ab4e37-9786-46a3-955b-7c4fd5ed4f70' }).toMatchSchema(schema);
  });
});
