/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('movie_tags', function (table) {
		table.increments('id');
		table.integer('note_id');
		table.integer('user_id');
		table.string('name');
		table.foreign('note_id').references('movie_notes.id');
		table.foreign('user_id').references('movie_notes.user_id');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('movie_tags');
};
