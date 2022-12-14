const AppError = require('./AppError');

class Validator {
	validateRating(rating) {
		if (rating > 5 || rating < 1 || !Number.isInteger(rating))
			throw new AppError('A nota deve ser um número inteiro ente 1 e 5');
	}
}

module.exports = Validator;
