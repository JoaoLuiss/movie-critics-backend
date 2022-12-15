const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class MovieTagsController {
	/**
	 * Boa prática - 5 métodos: create, update, delete, index, show
	 */

	async create(request, response) {
		const { note_id, user_id, name } = request.body;

		// validar o note_id - verificar se existe nota com o id fornecido
		const note = await knex('movie_notes').where({ id: note_id }).first();
		if (!note)
			throw new AppError(`Não foi encontrado nenhuma nota com o id: ${id}`);

		// validar o user_id - verificar se existe user com o id fornecido
		const user = await knex('users').where({ id: user_id }).first();
		if (!user)
			throw new AppError(`Não foi encontrado nenhum usuário com o id: ${id}`);

		// ^ validações concluidas ^

		// realizar inserção no database
		const tag = { note_id, user_id, name };
		await knex('movie_tags').insert(tag);

		return response.status(200).json();
	}

	async update(request, response) {
		const { id } = request.params;
		const { name } = request.body;

		// validar id da tag - verificar se existe tag com o id fornecido
		const tag = await knex('movie_tags').where({ id }).first();
		if (!tag)
			throw new AppError(`Não foi encontrada nenhuma tag com o id: ${id}`);

		// ^ validações concluídas ^

		// realizar atualização no database
		const updatedTag = { name };
		await knex('movie_tags').where({ id }).update(updatedTag);

		// devolver resposta
		return response.status(200).json();
	}

	async delete(request, response) {
		const { id } = request.params;

		// validar o id - verificar se existe tag com o id fornecido
		const tag = await knex('movie_tags').where({ id }).first();
		if (!tag)
			throw new AppError(`Não foi encontrada nenhuma tag com o id: ${id}`);

		// ^ validações concluídas ^

		// realizar remoção do database
		await knex('movie_tags').where({ id }).del();

		return response.status(200).json();
	}

	async index(request, response) {
		const tagList = await knex('movie_tags');

		return response.json(tagList);
	}

	async show(request, response) {
		const { id } = request.params;

		const tag = await knex('movie_tags').where({ id }).first();
		if (!tag)
			throw new AppError(`Não foi encontrada nenhuma tag com o id: ${id}`);

		return response.status(200).json(tag);
	}
}

module.exports = MovieTagsController;
