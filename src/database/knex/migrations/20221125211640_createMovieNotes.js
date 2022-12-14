exports.up = function (knex) {
	return knex.schema.createTable('movie_notes', (table) => {
		table.increments('id');
		table.text('title');
		table.text('description');
		table.integer('rating');
		table.time('created_at').defaultTo(knex.fn.now());
		table.time('updated_at');
		table.integer('user_id').notNullable();
		table.foreign('user_id').references('users.id');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('movie_notes');
};
