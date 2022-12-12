const Router = require('express');
const MovieNotesController = require('../controllers/MovieNotesController');

const movieNotesRoutes = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoutes.post('/', movieNotesController.create);
movieNotesRoutes.put('/:id', movieNotesController.update);

module.exports = movieNotesRoutes;
