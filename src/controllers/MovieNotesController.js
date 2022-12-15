const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const Validator = require('../utils/Validator');
const validator = new Validator();

// boa prática, máximo 5 métodos: create, update, delete, show, index
class MovieNotesController {
	/**
	 * FUNCIONALIDADES
	 */

	async create(request, response) {
		const { title, description, rating, user_id } = request.body;

		// validar o rating
		validator.validateRating(rating);

		// validar user_id - verificar se existe user com o id fornecido
		const user = await knex('users').where({ id: user_id }).first();
		if (!user)
			throw new AppError(
				`Não foi encontrado nenhum usuário com o id: ${user_id}`
			);

		const movieNote = {
			title,
			description,
			rating,
			user_id
		};
		await knex('movie_notes').insert(movieNote);

		return response.status(200).json();
	}

	async update(request, response) {
		const { title, description, rating } = request.body;
		const { id } = request.params;

		// validar se a nota é existe
		const note = await knex('movie_notes').where({ id }).first();
		if (!note)
			throw new AppError(`Não foi encontrada nenhuma nota com esse id: ${id}`);

		// validando o rating
		validator.validateRating(rating);

		// fazer a atualização no banco de dados
		const updatedNote = {
			title: title ?? note.title,
			description: description ?? note.description,
			rating: rating ?? MovieNotesController.rating,
			updated_at: knex.fn.now()
		};
		await knex('movie_notes').where({ id }).update(updatedNote);

		return response.json();
	}

	async delete(request, response) {
		const { id } = request.params;
		const note = await knex('movie_notes').where({ id }).first();
		if (!note)
			throw new AppError(`Não foi encontrado nenhuma nota com o id: ${id}`);

		await knex('movie_notes').where({ id }).del();

		return response.json();
	}

	async index(request, response) {
		const notesList = await knex('movie_notes');

		return response.json(notesList);
	}

	async show(request, response) {
		const { id } = request.params;

		// validar se existe nota com o id informado
		const note = await knex('movie_notes').where({ id }).first();
		if (!note)
			throw new AppError(`Não foi encontrada nenhuma nota com este id: ${id}`);

		await knex('movie_notes').where({ id }).first();

		return response.json(note);
	}
}

module.exports = MovieNotesController;
