class AppError {
	status;
	message;
	constructor(message, status = 400) {
		this.status = status;
		this.message = message;
	}
}

module.exports = AppError;
