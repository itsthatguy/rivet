import {
  loadSchema,
  generateResponseFromSchema,
  types,
  properties,
} from '../src';

describe('module', () => {
  describe('.loadSchema()', () => {
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

  describe('.generateResponseFromSchema()', () => {
    it('generates fake data', async () => {
      const response: any = await generateResponseFromSchema(__dirname, './fixtures/schema.fixture.json');
      expect(typeof response.data.name).toBe('string');
    });
  });

  describe('.types', () => {
    it('has only the expected types', () => {
      const propertiesKeys = Object.keys(properties);

      expect(propertiesKeys.length).toEqual(3);
      expect(propertiesKeys).toEqual(expect.arrayContaining([
        'links',
        'roles',
        'default'
      ]));
    });
  });

  describe('.types', () => {
    it('has only the expected types', () => {
      const typesKeys = Object.keys(types);

      expect(typesKeys.length).toEqual(6);
      expect(typesKeys).toEqual(expect.arrayContaining([
        'email',
        'phone',
        'token',
        'uri',
        'uuid',
        'default'
      ]));
    });

    it('has the expected email type', () => {
      expect(types.email).toEqual({
        id: 'types.email',
        type: 'string',
        format: 'email',
      });
    });

    it('has the expected phone type', () => {
      expect(types.phone).toEqual({
        id: 'types.phone',
        type: 'string',
        pattern: '((\\(\\d{3}\\) ?)|(\\d{3}-))?\\d{3}-\\d{4}'
      });
    });

    it('has the expected token type', () => {
      expect(types.token).toEqual({
        id: 'types.token',
        type: 'string',
        pattern: '^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$'
      });
    });

    it('has the expected uri type', () => {
      expect(types.uri).toEqual({
        id: 'types.uri',
        type: 'string',
        pattern: '[0-9a-fA-F]{8,20}'
      });
    });

    it('has the expected uuid type', () => {
      expect(types.uuid).toEqual({
        id: 'types.uuid',
        type: 'string',
        format: 'uuid',
        pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[34][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$'
      });
    });
  });
});
