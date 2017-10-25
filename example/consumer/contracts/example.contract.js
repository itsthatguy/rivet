const { types } = require('rivet');

module.exports = {
  title: 'Example Contract',
  required: ['name', 'token', 'description', 'updated_at'],

  properties: {
    name: { type: 'string' },
    token: types.jwt,
    description: { type: 'string' },
    updated_at: { type: 'string' }
  }
};
