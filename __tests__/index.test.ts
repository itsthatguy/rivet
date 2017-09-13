import {
  loadSchema,
  generateResponseFromSchema,
  types,
  properties,
} from '../src';

describe('module', () => {
  describe('loadSchema', () => {
    it('loads the file', () => {
      const schema: any = loadSchema(__dirname, './fixtures/schema.fixture.json');
      expect(schema).toMatchObject({
        title: 'my schema',
        required: ['data'],
        properties: {
          data: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' }
            }
          }
        }
      });
    });
  });

  describe('generateResponseFromSchema', () => {
    it('generates fake data', async () => {
      const response: any = await generateResponseFromSchema(__dirname, './fixtures/schema.fixture.json');
      expect(typeof response.data.name).toBe('string');
    });
  });
});
