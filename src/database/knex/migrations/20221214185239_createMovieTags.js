exports.up = function (knex) {
	return knex.schema.createTable('movie_tags', (table) => {
		table.increments('id');
		table.integer('note_id').notNullable();
		table.integer('user_id').notNullable();
		table.string('name').notNullable();

		table.foreign('note_id').references('movie_notes.id');
		table.foreign('user_id').references('users.id');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('movie_tags');
};
