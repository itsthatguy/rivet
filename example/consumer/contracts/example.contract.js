const { types } = require('@itg/rivet');

module.exports = {
  title: 'Example Contract',
  required: ['name', 'token', 'description', 'updated_at'],

  properties: {
    name: { type: 'string' },
    token: types.token,
    description: { type: 'string' },
    updated_at: { type: 'string' }
  }
};
