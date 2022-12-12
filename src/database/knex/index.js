const knexfile = require('../../../knexfile.js');
const knex = require('knex');

const knexConnection = knex(knexfile.development);

module.exports = knexConnection;
