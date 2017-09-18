const { types } = require('proco');

module.exports = {
  title: 'Index',
  required: ['name', 'token', 'description', 'updated_at'],

  properties: {
    name: { type: 'string' },
    token: types.token,
    description: { type: 'string' },
    updated_at: { type: 'string' }
  }
};
