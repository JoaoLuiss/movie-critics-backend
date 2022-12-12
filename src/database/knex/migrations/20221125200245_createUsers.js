exports.up = (knex) =>
	knex.schema.createTable('users', (table) => {
		table.increments('id');
		table.text('name').notNullable();
		table.text('email').notNullable();
		table.text('password').notNullable();
		table.text('avatar');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at');
	});

exports.down = (knex) => knex.schema.dropTable('users');
