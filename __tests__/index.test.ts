import {
  Config,
  load,
  generate,
  generateSync,
  types,
} from '../src';
import { configDefaults } from '../src/bin/config';

Config.set({
  aliases: {
    fixtures: '__tests__/fixtures/',
  }
});

describe('module', () => {
  afterAll(() => {
    Config.set(configDefaults);
  });

  describe('.load()', () => {
    it('loads from a file path', () => {
      const schema: any = load('fixtures/schema.fixture.json');
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

  describe('.generate()', () => {
    it('generates fake data from a file', async () => {
      const response: any = await generate('fixtures/schema.fixture.json');
      expect(typeof response.data.name).toBe('string');
    });

    it('generates fake data from a schema object', async () => {
      const schema = {
        title: 'Schema Object',
        required: [ 'name' ],
        properties: {
          name: { type: 'string' }
        }
      };

      const response: any = await generate(schema);
      expect(typeof response.name).toBe('string');
    });
  });

  describe('.generateSync()', () => {
    it('generates fake data from a file', () => {
      const response: any = generateSync('fixtures/schema.fixture.json');
      expect(typeof response.data.name).toBe('string');
    });

    it('generates fake data from a schema object', () => {
      const schema = {
        title: 'Schema Object',
        required: [ 'name' ],
        properties: {
          name: { type: 'string' }
        }
      };

      const response: any = generateSync(schema);
      expect(typeof response.name).toBe('string');
    });
  });

  describe('.types', () => {
    it('has only the expected types', () => {
      const typesKeys = Object.keys(types);

      expect(typesKeys.length).toEqual(6);
      expect(typesKeys).toEqual(expect.arrayContaining([
        'email',
        'phone',
        'jwt',
        'uri',
        'uuid',
        'default'
      ]));
    });
  });
});
