const { Router } = require('express');
const movieNotesRoutes = require('./movie_notes.routes');
const usersRoutes = require('./users.routes');

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/movie_notes', movieNotesRoutes);

module.exports = routes;
