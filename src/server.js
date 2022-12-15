require('express-async-errors');
const express = require('express');
const AppError = require('./utils/AppError');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);
app.use(function (error, request, response, next) {
	console.error(error);
	console.log(`
	\n
	------------------------------------
	Server still running on port: ${PORT}
	------------------------------------
	\n`);

	if (error instanceof AppError) {
		return response.status(error.status).json({
			status: 'error',
			message: error.message
		});
	}

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error.'
	});
});

const PORT = 3333;
app.listen(PORT, function (request, response) {
	console.log(`
	----------------------------------
	Server is running on port ${PORT}
	----------------------------------`);
});
