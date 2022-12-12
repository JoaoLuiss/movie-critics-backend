const { response } = require('express');
const knex = require('../database/knex');
const AppError = require('../utils/AppError');

// boa prática, máximo 5 métodos: create, update, delete, show, index
class MovieNotesController {
	/**
	 * FUNCIONALIDADES
	 */

	async create(request, response) {
		try {
			const { title, description, rating, user_id } = request.body;

			// validando o rating
			this.validateRating(rating);

			// validando o user_id
			this.validateUserId(user_id);

			const movieNote = {
				title,
				description,
				rating,
				user_id
			};
			await knex('movie_notes').insert(movieNote);

			return response.status(200).json();
		} catch (error) {
			console.error(error);
			return response.status(error.status).json(error);
		}
	}

	async update(request, response) {
		const { title, description, rating } = request.body;

		return response.json();
	}

	/**
	 * VALIDAÇÕES
	 */

	validateRating(rating) {
		try {
			if (rating > 5 || rating < 1 || !Number.isInteger(rating))
				throw new AppError('A nota deve ser um número inteiro ente 1 e 5');
		} catch (error) {
			console.error(error);
			return response.status(error.status).json(error);
		}
	}

	async validateUserId(user_id) {
		const user = await knex('users').where({ id: user_id }).first();
		if (!user)
			throw new AppError(
				`Não foi encontrado nenhum usuário com o id: ${user_id}`
			);
	}
}

module.exports = MovieNotesController;
