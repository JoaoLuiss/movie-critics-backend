const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');

class UsersController {
	/** Boas práticas -> máximo de 5 métodos:
	 * create, index(list), show(um), update, delete
	 */

	async index(request, response) {
		const userList = await knex('users');

		return response.status(200).json(userList);
	}

	async show(request, response) {
		const { id } = request.params;

		const user = await knex('users').where({ id }).first();

		return response.status(200).json(user);
	}

	async create(request, response) {
		try {
			const { name, email, password } = request.body;
			const newUser = { name, email, password };

			if (!name || !email || !password) {
				throw new AppError('O nome, email e a senha são obrigatórios.');
			}
			if (password.length > 3)
				throw new AppError('A senha deve conter 3 ou mais caracteres.');

			const emailExistingUser = await knex('users')
				.where({ email: email })
				.first();
			console.log(emailExistingUser);
			if (emailExistingUser) {
				throw new AppError('Já existe um usuário com este email cadastrado.');
			}

			const hashedPassword = await hash(password, 8);
			newUser.password = hashedPassword;

			await knex('users').insert(newUser);

			return response.status(201).json();
		} catch (error) {
			console.error(error);
			return response.status(error.status).json(error);
		}
	}

	async update(request, response) {
		try {
			const { name, email, password, new_password, avatar } = request.body;
			const { id } = request.params;

			// busca o usuário com o id informado (id)
			const user = await knex('users').where({ id }).first();
			if (!user) {
				throw new AppError(
					`Não foi encontrado nenhum usuário com o id: ${id}.`
				);
			}
			console.log(user);

			// verifica se o novo email já está cadastrado (email)
			const userWithNewEmailExists = await knex('users')
				.where({ email })
				.first();
			if (userWithNewEmailExists && userWithNewEmailExists.id !== user.id) {
				throw new AppError(
					'Já existe um outro usuário cadastrado com esse email.'
				);
			}

			// verifica a senha (password)
			const checkPassword = await compare(password, user.password);
			if (!checkPassword) {
				throw new AppError('A senha não confere.');
			}

			// verifica a nova senha caso haja (new_password)
			if (new_password) {
				if (new_password.length < 3) {
					throw new AppError('A nova senha deve conter 3 ou mais caracteres.');
				}
			}

			// altera os dados -- APLICAR IMUTABILIDADE AQUI
			const updatedUser = {
				id: user.id,
				name: name ?? user.name,
				email: email ?? user.email,
				password: await hash(new_password ?? password, 8),
				avatar: avatar ?? user.avatar ?? null,
				created_at: user.created_at,
				updated_at: knex.fn.now()
			};

			await knex('users').where({ id }).update(updatedUser);

			return response.status(200).json();
		} catch (error) {
			console.error(error);
			return response.status(400).json(error);
		}
	}

	async delete(request, response) {
		try {
			const { id } = request.params;
			const user = await knex('users').where({ id }).first();
			if (!user)
				throw new AppError(`Não foi encontrado nenhum usuário com o id: ${id}`);

			await knex('users').where({ id }).delete();

			return response.status(200).json();
		} catch (error) {
			console.error(error);
			return response.status(error.status).json(error);
		}
	}
}

module.exports = UsersController;
