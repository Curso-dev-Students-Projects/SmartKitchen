/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
	pgm.createTable("items", {
		id: {
			type: "serial",
			primaryKey: true,
		},
		name: {
			type: "varchar(255)",
			notNull: true,
		},
		quantity: {
			type: "integer",
			notNull: true,
		},
		unit: {
			type: "varchar(50)",
			notNull: true,
		},
		expiration_date: {
			type: "timestamp",
			notNull: true,
		},
		category_id: {
			type: "integer",
			notNull: true,
		},
		created_at: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp"),
		},
		updated_at: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp"),
		},
		deleted_at: {
			type: "timestamp",
			notNull: false,
		},
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable("items");
};
